import storage from '../../../../storage'

export default function () {
  // статические поля сетки и есть её конфиг
  return storage.caches.getCache('networksConfig')[this.net]
}
