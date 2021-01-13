export {default as Ticker} from './Ticker'

/**
 * 经纬度坐标转换
 */
export function transform(lng: number, lat: number, size = 512) {
  const l = 6381372 * Math.PI * 2
  const w = l
  const h = l / 2
  const m = 2.3

  let x = lng * Math.PI / 180
  let y = lat * Math.PI / 180

  y = 1.25 * Math.log(Math.tan(.25 * Math.PI + .4 * y))

  x = w / 2 + w / (2 * Math.PI) * x
  y = h / 2 - h / (2 * m) * y

  return [x, y]
}
