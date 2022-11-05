import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import avatar from "../assets/avatar.jpg";
import { usePlaylistContext } from "../contexts/PlaylistContext";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/outline";
import Songs from "./Songs";

const Center = () => {
  const { playlistContextState } = usePlaylistContext();
  const { selectedPlaylist } = playlistContextState;
  const { data: session } = useSession();

  const Divider = () => (
    <hr className="border-t-[0.1px] border-textExtraColor" />
  );
  return (
    <div className="flex-grow text-while relative h-screen overflow-y-auto scrollbar">
      <header className="absolute top-4 right-6">
        <div
          className="flex items-center gap-3 font-semibold text-sm bg-currentcolor hover:bg-[#3C3737] rounded-full p-0.5 cursor-pointer"
          onClick={() => signOut()}
        >
          <Image
            src={session?.user?.image || avatar}
            alt="avatar"
            width="30px"
            height="30px"
            className="object-cover rounded-full"
          />
          <div className="">{session?.user?.name}</div>
          <ChevronDownIcon className="w-5 h-5 pr-1" />
        </div>
      </header>
      <section className="flex items-end h-80 bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-6">
        {selectedPlaylist && (
          <>
            <Image
              src={selectedPlaylist.images[0].url}
              alt="img"
              width="230px"
              height="230px"
              className="shadow-2xl"
            />
            <div className="flex flex-col px-5">
              <p className="font-semibold">PLAYLIST</p>
              <h1 className="text-4xl font-extrabold lg:text-8xl md:text-6xl sm:text-4xl">
                {selectedPlaylist?.name}
              </h1>
              <div className="flex flex-row mt-5">
                <p className="font-semibold">
                  {selectedPlaylist.owner.display_name} &nbsp;
                </p>
                <p>{selectedPlaylist.tracks.total} songs</p>
              </div>
            </div>
            {/* <p>
              {selectedPlaylist.tracks.items.map(
                (item) =>
                  item?.track?.duration_ms &&
                  Math.floor((item?.track?.duration_ms / 1000 / 60) % 60)
              )}
            </p> */}
          </>
        )}
      </section>
      {selectedPlaylist && (
        <div className="grid grid-cols-[40%_30%_20%_10%] text-textExtraColor text-sm p-5 bg-bgSongColor">
          <div className="flex items-center gap-4 px-2">
            <p>#</p>
            <p>TITLE</p>
          </div>
          <span className="self-center ">ALBUM</span>
          <span className="self-center ">DATE ADDED</span>
          <ClockIcon className="w-5 h-5" />
        </div>
      )}
      <Divider />
      <div className="bg-bgSongColor p-5">
        <Songs />
      </div>
    </div>
  );
};

export default Center;
