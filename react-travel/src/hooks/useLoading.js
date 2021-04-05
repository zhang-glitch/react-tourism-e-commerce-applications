
import { useEffect } from 'react'

export default function useLoading(ele, callback, watch = []) {
  const node = document.querySelector(ele);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => callback && callback(entries))

    node && io.observe(node)

    return () => {
      if (io && node) {
        // 解绑元素
        io.unobserve(node);

        // 停止监听
        io.disconnect();

      }
    }
  }, watch)
}