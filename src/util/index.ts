export {default as Ticker} from './Ticker'

/**
 * 墨卡托投影
 */
export function mercator(lng: number, lat: number, r = 50) {
  const x = lng
  const y = Math.log(Math.abs(Math.tan(45 + .5 * lat))) * r
  return [x, y]
}
