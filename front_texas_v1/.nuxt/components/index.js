export { default as AsideMenu } from '../..\\components\\base\\AsideMenu.vue'
export { default as AsideMenuItem } from '../..\\components\\base\\AsideMenuItem.vue'
export { default as AsideMenuList } from '../..\\components\\base\\AsideMenuList.vue'
export { default as AsideRight } from '../..\\components\\base\\AsideRight.vue'
export { default as AsideTools } from '../..\\components\\base\\AsideTools.vue'
export { default as AsideUpdates } from '../..\\components\\base\\AsideUpdates.vue'
export { default as AsideUpdatesItem } from '../..\\components\\base\\AsideUpdatesItem.vue'
export { default as FooterBar } from '../..\\components\\base\\FooterBar.vue'
export { default as HeroBar } from '../..\\components\\base\\HeroBar.vue'
export { default as HeroBarMain } from '../..\\components\\base\\HeroBarMain.vue'
export { default as NavBar } from '../..\\components\\base\\NavBar.vue'
export { default as NavBarMenu } from '../..\\components\\base\\NavBarMenu.vue'
export { default as Overlay } from '../..\\components\\base\\Overlay.vue'
export { default as Tiles } from '../..\\components\\base\\Tiles.vue'
export { default as TitleBar } from '../..\\components\\base\\TitleBar.vue'
export { default as BCheckboxesWithValidation } from '../..\\components\\forms\\BCheckboxesWithValidation.vue'
export { default as BInputWithValidation } from '../..\\components\\forms\\BInputWithValidation.vue'
export { default as BSelectWithValidation } from '../..\\components\\forms\\BSelectWithValidation.vue'
export { default as ButtonGroup } from '../..\\components\\forms\\ButtonGroup.vue'
export { default as CheckboxPicker } from '../..\\components\\forms\\CheckboxPicker.vue'
export { default as FilePicker } from '../..\\components\\forms\\FilePicker.vue'
export { default as FilePickerDragAndDrop } from '../..\\components\\forms\\FilePickerDragAndDrop.vue'
export { default as PasswordUpdateForm } from '../..\\components\\forms\\PasswordUpdateForm.vue'
export { default as ProfileUpdateForm } from '../..\\components\\forms\\ProfileUpdateForm.vue'
export { default as RadioPicker } from '../..\\components\\forms\\RadioPicker.vue'
export { default as SearchPerson } from '../..\\components\\forms\\SearchPerson.vue'
export { default as CardComponent } from '../..\\components\\cards\\CardComponent.vue'
export { default as CardScrollable } from '../..\\components\\cards\\CardScrollable.vue'
export { default as CardToolbar } from '../..\\components\\cards\\CardToolbar.vue'
export { default as CardWidget } from '../..\\components\\cards\\CardWidget.vue'
export { default as GrowingNumber } from '../..\\components\\cards\\GrowingNumber.vue'
export { default as RefreshButton } from '../..\\components\\cards\\RefreshButton.vue'
export { default as BaseTable } from '../..\\components\\BaseTable.vue'
export { default as ClientsTableSample } from '../..\\components\\ClientsTableSample.vue'
export { default as ErrorContent } from '../..\\components\\ErrorContent.vue'
export { default as ExcelModal } from '../..\\components\\ExcelModal.vue'
export { default as FloatActionButton } from '../..\\components\\FloatActionButton.vue'
export { default as GaugeCharts } from '../..\\components\\GaugeCharts.vue'
export { default as LiquidFillChart } from '../..\\components\\LiquidFillChart.vue'
export { default as MediaItem } from '../..\\components\\MediaItem.vue'
export { default as ModalBox } from '../..\\components\\ModalBox.vue'
export { default as Notification } from '../..\\components\\Notification.vue'
export { default as Pagination } from '../..\\components\\Pagination.vue'
export { default as PersonInitials } from '../..\\components\\PersonInitials.vue'
export { default as SuccesContent } from '../..\\components\\SuccesContent.vue'
export { default as UserAvatar } from '../..\\components\\UserAvatar.vue'
export { default as ChartsChartConfig } from '../..\\components\\Charts\\chart.config.js'
export { default as ChartsDoughnutChart } from '../..\\components\\Charts\\DoughnutChart.js'
export { default as ChartsLineChart } from '../..\\components\\Charts\\LineChart.js'
export { default as UsersUserActions } from '../..\\components\\users\\UserActions.vue'
export { default as UsersUserCard } from '../..\\components\\users\\UserCard.vue'
export { default as UsersUserForm } from '../..\\components\\users\\UserForm.vue'
export { default as UsersUserModal } from '../..\\components\\users\\UserModal.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
