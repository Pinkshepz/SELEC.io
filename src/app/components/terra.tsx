'use client'

import React, { useState, useEffect } from "react";

export default function Terra () {

    // Mouse position handler
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [screenWidth, setScreenWidth] = useState(0);
    const [screenHeight, setScreenHeight] = useState(0);

    const setCoordinate = (e: MouseEvent) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
    };
    
    useEffect(() => {
        window.addEventListener("mousemove", setCoordinate);
    }, [setCoordinate]);

    const setScreenSize = (e: MouseEvent) => {
        setScreenWidth(window.innerWidth);
        setScreenHeight(window.innerHeight);
    };

    useEffect(() => {
        setScreenHeight(window.innerHeight * 0.75);
        setScreenWidth(window.innerWidth);
    }, [setScreenSize]);

    const x = cursorPos.x;
    const y = cursorPos.y;

    const density = 40;

    const heightMap = (
        cursorX: number,
        cursorY: number,
        nodeColumn: number,
        nodeRow: number,
        param: "h" | "z"
    ): number => {
        let dx = nodeColumn * density - cursorX + density;
        let dy = (2 * screenHeight) / 3 - cursorY;
        let absCenter = ((nodeRow - 10) ** 2) ** 0.5 + 10;
        let zDist = 0.00001 * absCenter ** 3;
        let height = dy / ((zDist * dx) ** 2 + zDist * 100);
        switch (param) {
            case "h":
                return height;
            case "z":
                return zDist;
            default:
                return 0;
        }
    };
    
    // Terra landscape
    const terraNode: Array<Array<React.ReactElement>> = [];

    // Loop for upper row
    for (let i = 0; i < 20; i++) {
        // Loop for each column
        terraNode.push([]);
        for (let j = 0; j < screenWidth / density; j++) {
            const rand = Math.random()
            terraNode[i].push(
                <div
                    className="absolute rounded-full bg-slate-700/30 dark:bg-slate-200/60"
                    style={{
                        left: j * density + (1 + (-1) ** i) * (density / 4) + "px",
                        top: i * 10 + heightMap(x, y, j, i, "h") - (screenHeight/3) + "px",
                        height: 2 + 0.2 * i + "px",
                        width: 2 + 0.2 * i + "px",
                        opacity: 0.9 - heightMap(x, y, j, i, "z") * 10,
                    }}
                    key={i.toString() + "-U-" + j.toString()}
                ></div>
            );
        }
    }

    // Loop for lower row
    for (let i = 0; i < 20; i++) {
        // Loop for each column
        terraNode.push([]);
        for (let j = 0; j < screenWidth / density; j++) {
            const rand = Math.random()
            terraNode[i].push(
                <div
                    className="absolute rounded-full bg-slate-700/30 dark:bg-slate-200/60"
                    style={{
                        left: j * density + (1 + (-1) ** i) * (density / 4) + "px",
                        top: i * 10 - heightMap(x, y, j, i, "h") + (screenHeight/3) + "px",
                        height: 2 + 0.2 * i + "px",
                        width: 2 + 0.2 * i + "px",
                        opacity: 0.9 - heightMap(x, y, j, i, "z") * 10,
                    }}
                    key={i.toString() + "-L-" + j.toString()}
                ></div>
            );
        }
    }

    return (
        <div className="-terra overflow-hidden">
            <div className="absolute w-[100%] top-[37%] flex flex-col justify-center">
                {terraNode.map((row, index) => (
                    <div
                        key={index}
                        style={{
                            height: 3 + 0.3 * index + "px",
                            marginBottom: index ** 2 / 40 + 1 + "px",
                        }}
                    >
                        {row}
                    </div>
                ))}
            </div>
        </div>
    );
};
    