import GradientLayout from "../../components/gradientLayout";
import { Box, Text, Flex } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { useMe } from "../../lib/hooks";
import prisma from "../../lib/prisma";
import { validateToken } from "../../lib/auth";
import SongTable from "../../components/songsTables";

const getBGColor = (id) => {
  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "gray",
    "teal",
    "yellow",
    "cyan",
  ];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist = ({ playlist }) => {
  const { user } = useMe();
  const color = getBGColor(playlist.id);
  return (
    <GradientLayout
      color={color}
      image="https://www.placecage.com/200/200"
      subtitle="playlist"
      title={`${playlist.name}`}
      description={`${playlist.songs.length} songs`}
      roundImage={false}
    >
      <Box color="white" paddingX="40px">
        <SongTable songs={playlist.songs}></SongTable>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  let user;

  try {
    user = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        desination: "/signin",
      },
    };
  }
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return {
    props: { playlist },
  };
};

export default Playlist;
