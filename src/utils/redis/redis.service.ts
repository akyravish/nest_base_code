import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async setCache(title: string, data: any, time: number): Promise<void> {
    try {
      const json = JSON.stringify(data);
      await this.redis.set(title, json, 'EX', time);
    } catch (error) {
      throw new HttpException(
        `Unable to set cache with title "${title}"`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCache(title: string): Promise<any> {
    try {
      const json = await this.redis.get(title);
      if (!json) return null;
      return JSON.parse(json);
    } catch (error) {
      throw new HttpException(
        `Unable to get cache with title "${title}"`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteCache(title: string): Promise<void> {
    try {
      await this.redis.del(title);
    } catch (error) {
      throw new HttpException(
        `Unable to delete cache with title "${title}"`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
