import GradientLayout from "../components/gradientLayout";
import { Box, Text, Flex } from "@chakra-ui/layout";
import prisma from "../lib/prisma";
import { Image } from "@chakra-ui/react";
import { useMe } from "../lib/hooks";

const Home = ({ artists }) => {
  const { user, isError, isLoading } = useMe();

  return (
    <GradientLayout
      color="purple"
      image="https://media-exp1.licdn.com/dms/image/C5603AQFEK2r3qzJtHA/profile-displayphoto-shrink_200_200/0/1534269516141?e=1655337600&v=beta&t=hzqvkErHmWm2rv05w8zePZtC1jj91iQl2dVzaTMhYIM"
      subtitle="subtitle"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistsCount} public playlists`}
      roundImage
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artists this month
          </Text>
          <Text fontSize="medium">Only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box paddingX="10px" width="20%">
              <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
                <Image
                  src="https://placekitten.com/200/200"
                  borderRadius="100%"
                />
                <Box marginTop="20px">
                  <Text fontSize="large"> {artist.name}</Text>
                  <Text fontSize="x-small"> Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: { artists },
  };
};

export default Home;
