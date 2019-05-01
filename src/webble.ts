import Peripheral from './peripheral'

class Webble {
  public static async discover(
    serviceUuid: BluetoothServiceUUID
  ): Promise<Peripheral> {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [serviceUuid] }]
      })

      return new Peripheral(serviceUuid, device)
    } catch (error) {
      console.log(error.message)
    }
  }
}

export default Webble
window.Webble = Webble
