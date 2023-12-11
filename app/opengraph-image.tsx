import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const alt = "TrainSync Homepage";
export const contentType = "image/png";

export default async function Image() {
  const fontData = await fetch(
    new URL("../public/Inter-Bold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(<HomePagePreview />, {
    ...size,
    fonts: [
      {
        name: "Inter-Bold",
        data: fontData,
        style: "normal",
      },
    ],
  });
}

export function HomePagePreview() {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        backgroundColor: "black",
        flexDirection: "column",
        fontWeight: "bold",
        fontFamily: '"Inter-Bold"',
      }}
    >
      <div
        style={{
          display: "flex",
          height: "58.5%",
          width: "100%",
          alignItems: "flex-end",
          justifyContent: "center",
          fontSize: 100,
          letterSpacing: -3,
          fontWeight: 700,
          textAlign: "center",
          gap: "-5",
        }}
      >
        <div style={{ color: "white", paddingLeft: "2" }}>Train</div>
        <div
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            paddingRight: "2",
          }}
        >
          Sync
        </div>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          fontSize: 30,
          gap: 7,
          fontWeight: 700,
        }}
      >
        <div style={{ color: "white", paddingLeft: "2" }}>Stop</div>
        <div
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            paddingRight: "2",
          }}
        >
          guessing,
        </div>

        <div style={{ color: "white", paddingLeft: "2" }}>start</div>
        <div
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            paddingRight: "2",
          }}
        >
          progressing.
        </div>
      </div>
    </div>
  );
}
