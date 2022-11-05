import { useSession } from "next-auth/react";
import { usePlaylistContext } from "../contexts/PlaylistContext";
import useSpotify from "../hooks/useSpotify";
import IconButton from "./IconButton";

const Divider = () => <hr className="border-t-[0.1px] border-gray-900" />;

const Sidebar = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();

  const { playlistContextState, updatePlaylistContextState } =
    usePlaylistContext();
  const { playlists } = playlistContextState;

  const setSelectedPlaylist = async (id: string) => {
    const playlistResponse = await spotifyApi.getPlaylist(id);
    updatePlaylistContextState({
      selectedPlaylist: playlistResponse.body,
      selectedPlaylistId: id,
    });
  };

  return (
    <div className="text-gray-500 px-2 pt-5 pb-36 text-sm lg:text-sm border-r border-gray-900 h-screen w-1/4 overflow-y-scroll sm:max-w-[12rem] lg:max-w-[15rem] hidden md:block scrollbar-hide">
      <div className="space-y-4 font-bold">
        <IconButton name="home" label="Home" />
        <IconButton name="search" label="Search" />
        <IconButton name="library" label="Your Library" />
        <Divider />
        <IconButton name="createPlaylist" label="Create Playlist" />
        <IconButton name="liked" label="Liked Songs" />
        <Divider />
        {playlists.map((item) => (
          <p
            className="cursor-pointer hover:text-while pl-6 pr-2 font-medium"
            key={item.id}
            onClick={() => setSelectedPlaylist(item.id)}
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
