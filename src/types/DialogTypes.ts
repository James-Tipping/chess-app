// Copyright (C) <2025>  <James Tipping> <github.com/James-Tipping>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

export enum DialogMessage {
  LOSE = 'You lose!',
  WIN = 'Well done! You win!',
  STALEMATE = "It's a stalemate - the game is drawn!",
  THREEFOLD_REPETITION = 'Draw by threefold repetition!',
  INSUFFICIENT_MATERIAL = 'Draw by insufficient material!',
  FIFTY_MOVE_RULE = 'Draw by fifty-move rule!',
  DRAW = 'The game is drawn!',
}
