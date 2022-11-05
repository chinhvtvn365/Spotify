import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { BackwardIcon } from "@heroicons/react/24/solid";
import { ForwardIcon } from "@heroicons/react/24/solid";
import { PauseCircleIcon } from "@heroicons/react/24/solid";
import { PlayIcon } from "@heroicons/react/24/solid";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { SpeakerXMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useSongContext } from "../contexts/SongContext";
import useSpotify from "../hooks/useSpotify";
import { SongReducerActionType } from "../types";
const Player = () => {
  const spotifyApi = useSpotify();

  const {
    songContextState: { isPlaying, selectedSong },
    dispatch,
  } = useSongContext();

  const handlePlayPause = async () => {
    const reponse = await spotifyApi.getMyCurrentPlaybackState();
    if (!reponse.body) return;
    if (reponse.body.is_playing) {
      await spotifyApi.pause();
      dispatch({ type: SongReducerActionType.TogglePlaying, payload: false });
    } else {
      await spotifyApi.play();
      dispatch({ type: SongReducerActionType.TogglePlaying, payload: true });
    }
  };
  return (
    <div className="h-24 bg-[#181818] grid grid-cols-3">
      <div className="flex items-center p-5">
        {selectedSong && (
          <>
            <div className="">
              <Image
                src={selectedSong.album.images[0].url}
                width="55px"
                height="55px"
              />
            </div>
            <div className="p-2">
              <h3 className="font-medium text-while">{selectedSong.name}</h3>
              <p className="text-sm">{selectedSong.artists[0].name}</p>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center justify-evenly">
        <ArrowsRightLeftIcon className="icon-playback" />
        <BackwardIcon className="icon-playback" />

        {isPlaying ? (
          <PauseCircleIcon
            className="icon-playback"
            onClick={handlePlayPause}
          />
        ) : (
          <PlayIcon className="icon-playback" onClick={handlePlayPause} />
        )}
        <ForwardIcon className="icon-playback" />
        <ArrowUturnLeftIcon className="icon-playback" />
      </div>
      <div className="flex justify-center items-center gap-2">
        <SpeakerWaveIcon className="icon-playback" />
        <input type="range" min={0} max={100} />
      </div>
    </div>
  );
};

export default Player;
