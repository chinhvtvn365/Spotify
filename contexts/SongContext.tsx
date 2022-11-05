import {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  useEffect,
} from "react";
import {
  ISongContext,
  SongContextState,
  SongReducerActionType,
} from "../types";
import useSpotify from "./../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { songReducer } from "./../reducers/SongReducer";

const initSongContextState: SongContextState = {
  selectedSongId: undefined,
  selectedSong: null,
  isPlaying: false,
  volume: 50,
  deviceId: null,
};
export const SongContext = createContext<ISongContext>({
  songContextState: initSongContextState,
  dispatch: () => {},
});
export const useSongContext = () => useContext(SongContext);

const SongContextProvider = ({ children }: { children: ReactNode }) => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  const [state, dispatch] = useReducer(songReducer, initSongContextState);
  useEffect(() => {
    const setCurrentDevice = async () => {
      const availableDevices = await spotifyApi.getMyDevices();
      if (!availableDevices.body.devices.length) return;
      const { id: deviceId, volume_percent } = availableDevices.body.devices[0];
      dispatch({
        type: SongReducerActionType.SetDevice,
        payload: {
          deviceId,
          volume: volume_percent as number,
        },
      });
      await spotifyApi.transferMyPlayback([deviceId as string]);
    };
    if (spotifyApi.getAccessToken()) {
      setCurrentDevice();
    }
  }, [spotifyApi, session]);
  useEffect(() => {
    const getCurrentPlaying = async () => {
      const songInfo = await spotifyApi.getMyCurrentPlaybackState();
      if (!songInfo.body) return;
      dispatch({
        type: SongReducerActionType.CurrentPlayingSong,
        payload: {
          selectedSong: songInfo.body.item,
          selectedSongId: songInfo.body.item?.id,
          isPlaying: songInfo.body.is_playing,
        },
      });
    };
    if (spotifyApi.getAccessToken()) {
      getCurrentPlaying();
    }
  }, [spotifyApi, session]);
  const songContextProviderData = {
    songContextState: state,
    dispatch,
  };
  return (
    <SongContext.Provider value={songContextProviderData}>
      {children}
    </SongContext.Provider>
  );
};
export default SongContextProvider;
