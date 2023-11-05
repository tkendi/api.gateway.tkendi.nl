import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { IntrospectAndCompose } from "@apollo/gateway";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { getEnvPath } from "./common/env.helper";

const envFilePath = getEnvPath(`.`);

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {},
      gateway: {
        debug: true,
        serviceHealthCheck: true,
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
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
