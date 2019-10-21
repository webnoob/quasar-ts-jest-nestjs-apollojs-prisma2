import { Vue, Component } from 'vue-property-decorator'

@Component
export default class NotificationMixin extends Vue {
  public showMessage (message: string, ...optionalParams: any[]): void {
    this.$q.notify({
      message: message.concat(optionalParams.join(' ')),
      color: 'green-5',
      position: 'top'
    })
  }

  public showError (message: string, ...optionalParams: any[]) {
    this.$q.notify({
      message: message.concat(optionalParams.join(' ')),
      color: 'red-9',
      position: 'top'
    })
  }
}
