/**
 * 生成随机数
 * @param min - 最小值
 * @param max - 最大值
 */
export function randomNum(min: number, max: number): number {
	const num = Math.floor(Math.random() * (min - max) + max)
	return num
}
