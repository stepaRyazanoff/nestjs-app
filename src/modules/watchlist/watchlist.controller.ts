import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchlistDTO } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { AuthenticatedRequest } from '../../common/types';
import { ApiResponse } from '@nestjs/swagger';
import { CreateAssetResponse } from './reponse';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, type: CreateAssetResponse })
  createAsset(
    @Body() dto: WatchlistDTO,
    @Req() request: AuthenticatedRequest,
  ): Promise<CreateAssetResponse> {
    return this.watchlistService.createAsset(request.user, dto);
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 204 })
  deleteAsset(
    @Query('id') assetId: string,
    @Req() request: AuthenticatedRequest,
  ): Promise<boolean> {
    const { id } = request.user;
    return this.watchlistService.deleteAsset(assetId, id);
  }
}
