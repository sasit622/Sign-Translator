from typing import Optional, List, Tuple


def pad_sequences_adjacency(sequences: List[List[Tuple[int, int]]],
                            seqlen: List[int],
                            maxlen: int,
                            padding: Optional[str] = 'pre',
                            truncating: Optional[str] = 'pre'
                            ) -> List[List[Tuple[int, int]]]:
    """Pad and trunc sequences of tokens with their respective adjuncts to
        other tokens as features.

    Parameters:
    -----------
    sequences : List[List[Tuple[int, int]]]
        A list of sequences of index pairs (Dictionary Of Key, DOK).
        - It's a list of sequences, e.g. [seq1, seq2, ...]
        - Each sequence contains index pairs, e.g. seq=[(r1,c1), (r2,c1), ...]
        - The columns (e.g. c1,c2,...) refer to a token sequence
        - The rows (e.g. r1,r2,...) are the adjencies to other tokens

    seqlen: List[int]
        Information about the original sequence lengths (e.g. number of
          tokens). It's the qudratic sparse matrix's dimension.

    maxlen : int
        Maximum length of the sequence. If seqlen<maxlen, then padding
          is executed. If seqlen>maxlen, then elements are truncated.

    padding : str
        (Default 'pre')

    truncating : str
        (Default 'pre')

    Returns:
    --------
    List[List[Tuple[int, int]]]
        A list of sequences of index pairs of quadratic sparse matrix
    """
    padded = []
    for k, idx_pairs in enumerate(sequences):
        if seqlen[k] > maxlen:  # truncate
            if truncating == 'post':
                # remove all index pairs outside maxlen (truncating='post')
                new_pairs = [(r, c) for r, c in idx_pairs
                             if (r < maxlen) and (c < maxlen)]
            else:  # 'pre'
                # shift row & col indicies to upper/left (truncating='pre')
                n_shift = seqlen[k] - maxlen
                new_pairs = [(r - n_shift, c - n_shift) for r, c in idx_pairs]
                new_pairs = [(r, c) for r, c in new_pairs
                             if (r >= 0) and (c >= 0)]

        elif seqlen[k] < maxlen:  # padding
            if padding == 'pre':
                # shift row & col indicies to lower/right
                n_shift = maxlen - seqlen[k]
                new_pairs = [(r + n_shift, c + n_shift) for r, c in idx_pairs]
            else:
                new_pairs = idx_pairs
        else:
            new_pairs = idx_pairs

        # sequence is done
        padded.append(new_pairs)

    # dataset is done
    return padded
