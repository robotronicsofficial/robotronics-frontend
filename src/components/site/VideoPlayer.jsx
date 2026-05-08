import PropTypes from "prop-types";

const getVideoUrl = (src) => {
  try {
    return new URL(src, window.location.origin);
  } catch {
    return null;
  }
};

const getYouTubeId = (url) => {
  if (!url) return null;

  if (url.hostname === "youtu.be") {
    return url.pathname.slice(1) || null;
  }

  if (url.pathname === "/watch") {
    return url.searchParams.get("v");
  }

  const embedMatch = url.pathname.match(/\/(?:embed|shorts)\/([^/?#]+)/);
  return embedMatch?.[1] || null;
};

const getVimeoId = (url) => url?.pathname.match(/\/(?:video\/)?(\d+)/)?.[1] || null;

const buildEmbedUrl = (provider, id, { autoPlay, loop, muted }) => {
  const params = new URLSearchParams();

  if (provider === "youtube") {
    params.set("rel", "0");
    params.set("modestbranding", "1");
    if (autoPlay) params.set("autoplay", "1");
    if (loop) {
      params.set("loop", "1");
      params.set("playlist", id);
    }
    if (muted) params.set("mute", "1");

    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
  }

  if (autoPlay) params.set("autoplay", "1");
  if (loop) params.set("loop", "1");
  if (muted) params.set("muted", "1");

  return `https://player.vimeo.com/video/${id}?${params.toString()}`;
};

const getProvider = (src) => {
  const url = getVideoUrl(src);
  if (!url) return { type: "file" };

  const hostname = url.hostname.replace(/^www\./, "");

  if (hostname === "youtube.com" || hostname === "youtu.be") {
    const id = getYouTubeId(url);
    return id ? { type: "youtube", id } : { type: "file" };
  }

  if (hostname === "vimeo.com" || hostname === "player.vimeo.com") {
    const id = getVimeoId(url);
    return id ? { type: "vimeo", id } : { type: "file" };
  }

  return { type: "file" };
};

const VideoPlayer = ({
  src,
  title,
  className,
  style,
  autoPlay,
  muted,
  loop,
  controls,
  poster,
}) => {
  if (!src) {
    return null;
  }

  const provider = getProvider(src);

  if (provider.type === "youtube" || provider.type === "vimeo") {
    return (
      <iframe
        src={buildEmbedUrl(provider.type, provider.id, { autoPlay, loop, muted })}
        title={title}
        className={className}
        style={style}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <video
      src={src}
      title={title}
      className={className}
      style={style}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      controls={controls}
      playsInline
      preload={autoPlay ? "auto" : "metadata"}
      poster={poster}
    />
  );
};

VideoPlayer.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  autoPlay: PropTypes.bool,
  muted: PropTypes.bool,
  loop: PropTypes.bool,
  controls: PropTypes.bool,
  poster: PropTypes.string,
};

VideoPlayer.defaultProps = {
  src: "",
  title: "Video player",
  className: "",
  style: undefined,
  autoPlay: false,
  muted: false,
  loop: false,
  controls: true,
  poster: undefined,
};

export default VideoPlayer;
