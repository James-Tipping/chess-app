import {
  ChessPieceColour,
  ChessPieceType,
} from './types/ChessBoardElementTypes';

export function getChessPieceColour(
  piece?: ChessPieceType | null,
): ChessPieceColour | null {
  let result: ChessPieceColour | null = null;

  if (!piece) {
    return result;
  }
  if (piece === piece.toUpperCase()) {
    result = ChessPieceColour.WHITE;
  } else if (piece === piece.toLowerCase()) {
    result = ChessPieceColour.BLACK;
  }

  return result;
}
