import {
  SongContextState,
  SongReducerAction,
  SongReducerActionType,
} from "../types";

export const songReducer = (
  state: SongContextState,
  { type, payload }: SongReducerAction
) => {
  switch (type) {
    case SongReducerActionType.SetDevice:
      return { ...state, deviceId: payload.deviceId, volume: payload.volume };
    case SongReducerActionType.TogglePlaying:
      return { ...state, isPlaying: payload };
    case SongReducerActionType.CurrentPlayingSong:
      return {
        ...state,
        selectedSong: payload.selectedSong,
        selectedSongId: payload.selectedSongId,
        isPlaying: payload.isPlaying,
      };
    default:
      return state;
  }
};
