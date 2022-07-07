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

const RoleCard: React.FC<{
  title: string;
  roleName: string;
  content: string;
  target: string;
}> = ({ title, roleName, content, target }) => {
  return (
    <NextLink href={target} passHref>
      <Link w={"100%"}>
        <Card
          heading={
            <Heading w={"100%"} variant="noShadow">
              {title}
            </Heading>
          }
          centerDivider={
            <RoleBadge
              roleName={roleName}
              width="50px"
              height="50px"
              border="2px solid"
            />
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

export { RoleCard };
