import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/common/cache';
import * as redisStore from "cache-manager-redis-store";
@Module({
    imports:[
        CacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    store: redisStore,
                    host: configService.get<string>('REDIS_HOST'),
                    port: configService.get<number>('REDIS_PORT'),
                    ttl: configService.get<number>('REDIS_TTL'),
                };
            },
        })
    ]
})
export class RedisModule {}
