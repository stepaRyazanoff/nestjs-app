import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';
import { WatchlistDTO } from './dto';
import { IUser } from '../../common/types';
import { CreateAssetResponse } from './reponse';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(Watchlist)
    private readonly watchlistRepository: typeof Watchlist,
  ) {}

  async createAsset(
    user: IUser,
    dto: WatchlistDTO,
  ): Promise<CreateAssetResponse> {
    try {
      const watchlist = {
        user: user.id,
        name: dto.name,
        assetId: dto.assetId,
      };
      await this.watchlistRepository.create(watchlist);
      return watchlist;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAsset(id: string, user: number): Promise<boolean> {
    try {
      await this.watchlistRepository.destroy({ where: { id, user } });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
