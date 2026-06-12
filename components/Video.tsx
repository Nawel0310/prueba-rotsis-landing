import videoLoader from "@/video-loader";
import { VideoHTMLAttributes, Ref } from "react";

type VideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
  ref?: Ref<HTMLVideoElement>;
};

export default function Video({ src, ...props }: VideoProps) {
  const resolvedSrc = typeof src === "string" ? videoLoader(src) : src;
  return <video src={resolvedSrc} {...props} />;
}
