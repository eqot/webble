import Webble from './webble'

const element = document.getElementById('root')
if (element) {
  element.innerHTML = `
<div>
  <button id="button">Discover</button>
</div>
`

  document.querySelector('#button').addEventListener('click', async () => {
    const peripheral = await Webble.discover(
      '10b20100-5b3b-4571-9508-cf3efcd7bbae'
    )
    if (!peripheral) {
      return
    }

    await peripheral.connect()
  })
}
