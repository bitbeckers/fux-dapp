import ConnectWallet from "../ConnectWallet";
import {
  Stack,
  Heading,
  HStack,
  Link,
  Spacer,
  Card,
  RoleBadge,
  Text,
} from "@raidguild/design-system";
import NextLink from "next/link";

const JourneyCard: React.FC<{
  title: string;
  content: string;
  target: string;
}> = ({ title, content, target }) => {
  return (
    <NextLink href={target} passHref>
      <Link w={"100%"}>
        <Card
          heading={
            <Heading w={"100%"} variant="noShadow">
              {title}
            </Heading>
          }
          variant="withHeader"
          bg="whiteAlpha.200"
        >
          <Text>{content}</Text>
        </Card>
      </Link>
    </NextLink>
  );
};

export { JourneyCard };
