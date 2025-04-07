import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";

import styles from "./IndianMap.module.scss";
import type { RegionData } from "./MapData";
import { indianRegions } from "./MapData";

interface IndianMapProps {
  regions?: RegionData[];
  width?: string;
  height?: string;
  onRegionSelect: (region: RegionData | null) => void;
}

const IndianMap: React.FC<IndianMapProps> = ({
  regions = indianRegions,
  width = "100%",
  height = "100%",
  onRegionSelect,
}) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [autoChangeEnabled, setAutoChangeEnabled] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    let interval: number | null = null;
    if (autoChangeEnabled) {
      interval = window.setInterval(() => {
        const coloredRegions = regions.filter((r) => r.color);
        if (coloredRegions.length === 0) return;

        const currentIndex = coloredRegions.findIndex(
          (r) => r.id === selectedRegion,
        );
        const nextIndex = (currentIndex + 1) % coloredRegions.length;
        const nextRegion = coloredRegions[nextIndex];

        // Highlight: Changed this part
        if (nextRegion) {
          setSelectedRegion(nextRegion.id);
          onRegionSelect(nextRegion);
        }
        // End of highlight
      }, 2000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [regions, selectedRegion, onRegionSelect, autoChangeEnabled]);

  const handleMouseMove = useCallback((event: React.MouseEvent<SVGElement>) => {
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      setTooltipPos({
        x: event.clientX - svgRect.left,
        y: event.clientY - svgRect.top + 40,
      });
    }
  }, []);

  const handleMouseEnter = (regionId: string) => {
    setHoveredRegion(regionId);
  };

  const handleMouseLeave = () => {
    setHoveredRegion(null);
  };

  const handleClick = (regionId: string) => {
    const region = regions.find((r) => r.id === regionId);
    if (region && region.color) {
      setAutoChangeEnabled(false);
      // if (regionId === selectedRegion) {
      //   setSelectedRegion(null);
      //   onRegionSelect(null);
      // } else {
      setSelectedRegion(regionId);
      onRegionSelect(region);
      // }
    }
  };

  const getRegionColor = (region: RegionData) => {
    if (region.color) {
      if (selectedRegion === region.id) return "#BB7500";
      if (hoveredRegion === region.id) return "#A0522D";
      return region.color;
    }
    return "#7F6E51";
  };

  // const getRegionCenter = (region: RegionData): { x: number; y: number } => {
  //   const element = document.getElementById(region.id);
  //   if (element instanceof SVGGraphicsElement) {
  //     const bbox = element.getBBox();
  //     return {
  //       x: bbox.x + bbox.width / 2,
  //       y: bbox.y + bbox.height / 2,
  //     };
  //   }
  //   console.warn(
  //     `Element with id ${region.id} is not an SVG element or doesn't exist`,
  //   );
  //   return { x: 0, y: 0 };
  // };

  // const createCurvedPath = (
  //   start: { x: number; y: number },
  //   end: { x: number; y: number },
  // ) => {
  //   const midY = (start.y + end.y) / 2;
  //   const controlPoint1 = { x: start.x, y: midY };
  //   const controlPoint2 = { x: end.x, y: midY };
  //   return `M ${start.x},${start.y} C ${controlPoint1.x},${controlPoint1.y} ${controlPoint2.x},${controlPoint2.y} ${end.x},${end.y}`;
  // };

  return (
    <div className={styles.mapContainer} style={{ width, height }}>
      <motion.svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 1099 1137"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
      >
        {regions.map((region) => (
          <motion.path
            key={region.id}
            id={region.id}
            d={region.d}
            fill={getRegionColor(region)}
            stroke="#FFFCF4"
            strokeWidth="1.35911"
            onMouseEnter={() => handleMouseEnter(region.id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(region.id)}
            style={{ cursor: region.color ? "pointer" : "default" }}
            initial={{ z: 0 }}
            animate={{
              z: selectedRegion === region.id ? 30 : 0,
              scale: selectedRegion === region.id ? 1.05 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        ))}
        <AnimatePresence>
          {selectedRegion &&
            !isMobile &&
            (() => {
              const region = regions.find((r) => r.id === selectedRegion);
              if (region) {
                // const center = getRegionCenter(region);
                // const endPoint = { x: center.x + 100, y: center.y + 150 };
                // const curvePath = createCurvedPath(center, endPoint);
                return (
                  <motion.g
                    key={selectedRegion}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* <motion.path
                      d={curvePath}
                      fill="none"
                      stroke="#000000"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.text
                      x={endPoint.x + 20}
                      y={endPoint.y + 20}
                      textAnchor="middle"
                      fill="#000000"
                      className={styles.regionName}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {region.name}
                    </motion.text> */}
                  </motion.g>
                );
              }
              return null;
            })()}
        </AnimatePresence>
      </motion.svg>
      {hoveredRegion && !isMobile && (
        <motion.div
          className={styles.tooltip}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
          }}
        >
          {regions.find((r) => r.id === hoveredRegion)?.name ||
            "Unknown Region"}
        </motion.div>
      )}
    </div>
  );
};

export default IndianMap;
