import moment from "moment";
import Image from "next/image";
import { convertDuration } from "./../utils/durationConverter";

interface IProps {
  item: SpotifyApi.PlaylistTrackObject;
  index: number;
}

const Song = ({ item, index }: IProps) => {
  const { track } = item;

  // function relativeDays(timestamp: any) {
  //   const rtf = new Intl.RelativeTimeFormat("en", {
  //     numeric: "auto",
  //   });
  //   const oneDayInMs = 1000 * 60 * 60 * 24;
  //   const daysDifference = Math.round(
  //     (timestamp - new Date().getTime()) / oneDayInMs
  //   );

  //   return rtf.format(daysDifference, "day");
  // }

  return (
    <div className="grid grid-cols-[40%_30%_20%_10%] hover:bg-bgHoverSongColor rounded-md text-sm">
      <div className="flex justify-start p-2 items-center gap-4 ">
        <p>{index + 1}</p>
        <Image
          src={track?.album.images[0].url || ""}
          alt="album"
          width="40px"
          height="40px"
        />
        <div>
          <p className="text-base">{track?.name}</p>
          <p className="text-textExtraColor">{track?.artists[0].name}</p>
        </div>
      </div>
      <div className="self-center text-textExtraColor">
        <p className="">{track?.album.name}</p>
      </div>
      <div className="self-center text-textExtraColor">
        <p className="">{moment(item.added_at).fromNow()}</p>
      </div>
      <div className="self-center text-textExtraColor">
        <p className="">{convertDuration(track?.duration_ms as number)}</p>
      </div>
    </div>
  );
};

export default Song;
