import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Dispatch } from "react";
export enum TokenError {
  RefreshAccessTokenError = "RefreshAccessTokenError",
}
export interface ExtendedToken extends JWT {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  user: User;
  error?: TokenError;
}
export interface ExtendedSession extends Session {
  accessToken: ExtendedToken["accessToken"];
  error: ExtendedToken["error"];
}

export interface PlaylistContextState {
  playlists: any[];
  selectedPlaylistId: string | null;
  selectedPlaylist: SpotifyApi.SinglePlaylistResponse | null;
}
export interface IPlaylistContext {
  playlistContextState: PlaylistContextState;
  updatePlaylistContextState: (
    updateObj: Partial<PlaylistContextState>
  ) => void;
}
export interface SongContextState {
  selectedSongId?: string;
  selectedSong: any | null;
  isPlaying: boolean;
  volume: number;
  deviceId: string | null;
}
export interface ISongContext {
  songContextState: SongContextState;
  dispatch: Dispatch<SongReducerAction>;
}
export enum SongReducerActionType {
  SetDevice = "SetDevice",
  TogglePlaying = "TogglePlaying",
  CurrentPlayingSong = "CurrentPlayingSong",
}
export type SongReducerAction =
  | {
      type: SongReducerActionType.SetDevice;
      payload: Pick<SongContextState, "deviceId" | "volume">;
    }
  | {
      type: SongReducerActionType.TogglePlaying;
      payload: boolean;
    }
  | {
      type: SongReducerActionType.CurrentPlayingSong;
      payload: Pick<
        SongContextState,
        "selectedSongId" | "selectedSong" | "isPlaying"
      >;
    };
