export default class Peripheral {
  private serviceUuid: BluetoothServiceUUID
  private device: BluetoothDevice
  private characteristics: {
    [key: string]: BluetoothRemoteGATTCharacteristic
  } = {}

  constructor(serviceUuid: BluetoothServiceUUID, device: BluetoothDevice) {
    this.serviceUuid = serviceUuid
    this.device = device
  }

  public async connect(): Promise<void> {
    try {
      const server = await this.device.gatt.connect()

      const service = await server.getPrimaryService(this.serviceUuid)

      const characteristics = await service.getCharacteristics()
      for (const characteristic of characteristics) {
        this.characteristics[characteristic.uuid] = characteristic
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  public read(
    characteristicUuid: BluetoothCharacteristicUUID
  ): Promise<DataView> {
    return this.characteristics[characteristicUuid].readValue()
  }

  public write(
    characteristicUuid: BluetoothCharacteristicUUID,
    data: number[],
    withResponse: boolean
  ) {
    return this.characteristics[characteristicUuid].writeValue(
      new Uint8Array(data)
    )
  }
}
