import { usePlaylistContext } from "../contexts/PlaylistContext";
import Song from "./Song";

const Songs = () => {
  const { playlistContextState } = usePlaylistContext();
  if (!playlistContextState.selectedPlaylist) return null;
  console.log(playlistContextState.selectedPlaylist);

  return (
    <div className=" flex flex-col">
      {playlistContextState.selectedPlaylist.tracks.items.map((item, index) => (
        <Song key={item.track?.id} item={item} index={index} />
      ))}
    </div>
  );
};

export default Songs;
