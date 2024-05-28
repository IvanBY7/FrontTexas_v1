
from django.shortcuts import render
from django.contrib.auth.models import Group
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework import permissions
from apps.accounts.models import *
from apps.sensors.serializers import config_tipoSerializer
from .serializers import *
from apps.company.models import *
import traceback  # Para obtener la traza completa del error
# Create your views here.

class SensorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows sensors to be viewed or edited.
    """
    
    queryset = sensor.objects.all()
    serializer_class = SensorSerializer
    @action(detail=False, methods=['get'], url_path='get-sensors/(?P<id>\d+)', url_name='sensor')
    def get_sensors(self, request, id):
        try:
            #Busqueda del dispositivo
            querydipositivo = dispositivo.objects.get(IdDispositivo=id)
            try:
                #Filtrado del sensor por dispositivo
                querysensor = sensor.objects.filter(fk_IdDispositivo = querydipositivo)
                sensores = SensorSerializer(querysensor, many=True)
            except Exception as e:
                # Capturar cualquier excepción y devolver información sobre el error
                error_message = str(e)  # Obtiene el mensaje de error
                error_trace = traceback.format_exc()  # Traza completa del error
                #Retorno del error de no haber encontrado ningun sensor
                return Response(
                    {
                        "error": "No se encontró ningun sensor",
                        "message": error_message,
                        "trace": error_trace
                    },
                    status=status.HTTP_204_NO_CONTENT
                )
        except Exception as e:
            # Capturar cualquier excepción y devolver información sobre el error
            error_message = str(e)  # Obtiene el mensaje de error
            error_trace = traceback.format_exc()  # Traza completa del error
            #Retorna respuesta de no haber encontrado ningun dispositivo
            return Response(
                {
                    "error": "No se encontró el dispositivo",
                    "message": error_message,
                    "trace": error_trace
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        #Retorna los sensores por dispositivo
        return Response({"Sensores del dispositivo": id, "sensores":sensores.data})
class RegisterViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows registers to be viewed or edited.
    """

    queryset = register.objects.all()
    serializer_class = RegisterSerializer
    
    #Endpoint que registra los los datos recibidos por el agente
    @action(detail=False, methods=['post'], url_path='register-data', url_name='data')
    def register_data(self, request):
        #Verificando que exista la MAC
        DispositivoMAC = request.data.get('MAC')
        if not DispositivoMAC:
            #Devuelve error en caso de que no exista la dirección MAC
            return Response(
                {"error": "MAC is required"},
                status = status.HTTP_400_BAD_REQUEST
            )
        try:
            #Verificará si el dispositivo ya se encuentra registrado
            dispositivo2 = dispositivo.objects.get(MAC=DispositivoMAC)
            try:
                #Verifica que haya uns lista de dispositivos
                sensores = request.data.get('SensorDispositivo')
                
                if not sensores:
                    #Retorna error en caso de que no haya sensores
                    return Response(
                        {"Error": "not found sensors"},
                        status = status.HTTP_204_NO_CONTENT
                    )
                #recorre la lista de sensores
                for sens in sensores:
                    #Obtención del sensor
                    querysensor = sensor.objects.filter(Nombre = sens.get('sensor'), fk_IdDispositivo = dispositivo2)
                    primer_sensor = querysensor.first()

                    #Verificando si el sensor existe
                    if not querysensor:
                        querytipo = config_tipo_sensor.objects.get(Nombre = 'Default')
                        try:
                            
                            #Registro del sensor
                            createsensor = sensor.objects.create(
                                Nombre = sens.get('sensor'),
                                Licencia_sensor = 'licencia',
                                fk_IdTipo = querytipo,
                                fk_IdDispositivo = dispositivo2
                            )
                            primer_sensor=createsensor
                            return Response(
                                {"message": "Sensor registrado"}
                            )
                        except:
                            return Response(
                                {"Error": "No se pudo crear"}
                            )
                    try:
                        #creación de registro
                        primsens = SensorSerializer(primer_sensor)
                        createregister = register.objects.create(
                            fk_IdSensor = primer_sensor,
                            Valor = sens.get('Data')
                        )
                    except Exception as e:
                        # Capturar cualquier excepción y devolver información sobre el error
                        error_message = str(e)  # Obtiene el mensaje de error
                        error_trace = traceback.format_exc()  # Traza completa del error
                        
                        return Response(
                            {
                                "error": "Error al crear el registro",
                                "message": error_message,
                                "trace": error_trace
                            },
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR
                        )
                return Response(
                    {"message": "Registro exitoso"},
                    status = status.HTTP_201_CREATED
                )
            except:
                return Response(
                    {"Error": "not found sensors"},
                    status = status.HTTP_204_NO_CONTENT
                )
        except:
            area = Area_trabajo.objects.get(Nombre_zona='AreaDefault')
            empresa = company.objects.get(IdEmpresa = request.data.get('EMPRESA'))
            create= dispositivo.objects.create(
                IdArea = area,
                Modelo = request.data.get('MODELO'),
                MAC = request.data.get('MAC'),
                fk_IdEmpresa = empresa
            )
            return Response(
                {"Registred": "Dispositivo Registrado"},
                status=status.HTTP_201_CREATED
            )
    
    @action(detail=False, methods=['get'], url_path='get-register/(?P<id>\d+)', url_name='data')
    def get_RegisterBySensor(self, request, id):
        try:
            queryregisters = register.objects.filter(fk_IdSensor = id).order_by('created_at')
            if not queryregisters:
                return Response(
                    {
                        "error": "No se encontrarons registros",
                    },
                    status = status.HTTP_204_NO_CONTENT
                )
            registros = RegisterSerializer(queryregisters, many=True)
        except Exception as e:
            # Capturar cualquier excepción y devolver información sobre el error
            error_message = str(e)  # Obtiene el mensaje de error
            error_trace = traceback.format_exc()  # Traza completa del error
                        
            return Response(
                {
                    "error": "Error al obtener los registros",
                    "message": error_message,
                    "trace": error_trace
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        return Response ({"Registros del sensor":id, "Registros":registros.data})
    
    @action(detail=False, methods=['get'], url_path='get-register_short/(?P<id>\d+)/(?P<rango>\d+)', url_name='data')
    def get_RegisterBySensor_short(self, request, id, rango):
        print(id)
        print(rango)
        try:
            queryregisters = register.objects.filter(fk_IdSensor = id).order_by('-created_at')[:int(rango)]
            if not queryregisters:
                return Response(
                    {
                        "error": "No se encontrarons registros",
                    },
                    status = status.HTTP_204_NO_CONTENT
                )
            registros = RegisterSerializer(queryregisters, many=True)
        except Exception as e:
            # Capturar cualquier excepción y devolver información sobre el error
            error_message = str(e)  # Obtiene el mensaje de error
            error_trace = traceback.format_exc()  # Traza completa del error
                        
            return Response(
                {
                    "error": "Error al obtener los registros",
                    "message": error_message,
                    "trace": error_trace
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        return Response ({"Registros del sensor":id, "Registros":registros.data})
    
    @action(detail=False, methods=['get'], url_path='get_sensors_by_company/(?P<id>\d+)', url_name='data')
    def get_sensors_by_company(self, request, id):

        try:
            #Buscar el dispositivo
            querydispositivo = dispositivo.objects.filter(fk_IdEmpresa = id)
            
            #Verificar que haya dispositivo
            areas = []
            if not querydispositivo:
                return Response(
                    {
                        "error": "No se encontraron dispositivos de esta empresa",
                    },
                    status = status.HTTP_204_NO_CONTENT
                )
            Dispositivos = dispositivoSerializer(querydispositivo, many=True)
            #Iterar sobre la lista de dispositivos
            for dispo in Dispositivos.data:
                #Filtrar los sensores por dispositivo
                querysensores = sensor.objects.filter(fk_IdDispositivo = dispo.get('IdDispositivo'))
                
                #verificar la existencia de los sensores
                if not querysensores:
                    infoArea = {
                        'Sucursal': dispo.get('IdArea').get('fk_IdSucursal'),
                        'idDispositivo': dispo.get('IdDispositivo'),
                        'Nombre_zona': dispo.get('IdArea').get('Nombre_zona')
                    }
                    areas.append(infoArea)
                else:
                    sensoresResponse = SensorSerializer(querysensores, many=True)
                    #Iterar sobre los sensores
                    sensores = []
                    for sensorindividual in sensoresResponse.data:
                        # print(sensorindividual)
                        queryRegistro = register.objects.filter(fk_IdSensor = sensorindividual.get('IdSensor')).order_by('-created_at').first()
                        if not queryRegistro:
                            infoRegistro = {
                                'valor': '#',
                                'fecha_registro': '#'
                            }
                            infoSensor = {
                                'id': sensorindividual.get('IdSensor'),
                                'config': sensorindividual.get('fk_IdTipo'),
                                'registro': infoRegistro
                            }
                            sensores.append(infoSensor)
                        else:
                            registroResponse = RegisterSerializer(queryRegistro)
                            # print(registroResponse.data)
                            infoRegistro = {
                                'valor': registroResponse.data.get('Valor'),
                                'fecha_registro': registroResponse.data.get('created_at')
                            }
                            infoSensor = {
                                'id': sensorindividual.get('IdSensor'),
                                'config': sensorindividual.get('fk_IdTipo'),
                                'registro': infoRegistro
                            }
                            sensores.append(infoSensor)
                    infoarea = {
                        'Sucursal': dispo.get('IdArea').get('fk_IdSucursal'),
                        'idDispositivo': dispo.get('IdDispositivo'),
                        'Nombre_zona': dispo.get('IdArea').get('Nombre_zona'),
                        'sensores': sensores
                    }
                    areas.append(infoarea)
        except Exception as e:
            # Capturar cualquier excepción y devolver información sobre el error
            error_message = str(e)  # Obtiene el mensaje de error
            error_trace = traceback.format_exc()  # Traza completa del error
                        
            return Response(
                {
                    "error": "Error al obtener los registros",
                    "message": error_message,
                    "trace": error_trace
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        return Response ({"areas": areas})
    
    
class dispositivoViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows registers to be viewed or edited.
    """
    queryset = dispositivo.objects.all()
    serializer_class = dispositivoSerializer