import { useEffect, useState } from "react"

export function useScreenSize() {
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const [screenType, setScreenType] = useState("hidden")

  useEffect(() => {
    setScreenWidth(window.innerWidth)
    setScreenHeight(window.innerHeight)
    window.addEventListener("resize", handleViewPort)

    switch (true) {
      case window.innerWidth > 768:
        setScreenType("web")
        break
      case window.innerWidth >= 0 && window.innerWidth <= 768:
        setScreenType("tablet")
        break
      case window.innerWidth > 0 && window.innerWidth <= 576:
        setScreenType("mobile")
        break

      default:
        setScreenType("hidden")
    }

    return () => {
      window.removeEventListener("resize", handleViewPort)
    }
  }, [screenWidth, screenHeight])

  const handleViewPort = () => {
    setScreenWidth(window.innerWidth)
    setScreenHeight(window.innerHeight)
  }

  return {
    screenWidth,
    screenHeight,
    deviceType: screenType,
  }
}
