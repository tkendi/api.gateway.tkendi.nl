import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { IntrospectAndCompose } from "@apollo/gateway";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {},
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: "accounts",
              url: "https://api.authorize.tkendi.nl/graphql",
            },
            {
              name: "finance",
              url: "https://api.finance.tkendi.nl/graphql",
            },
          ],
        }),
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
