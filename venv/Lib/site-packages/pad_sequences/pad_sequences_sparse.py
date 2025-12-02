from typing import Optional, List, Tuple


def pad_sequences_sparse(sequences: List[List[Tuple[int, int]]],
                         seqlen: List[int],
                         padding: Optional[str] = 'pre',
                         truncating: Optional[str] = 'pre',
                         maxlen: Optional[int] = None
                         ) -> List[List[Tuple[int, int]]]:
    """Pad and trunc sequences that are sparse masks

    Parameters:
    -----------
    sequences : List[List[List[Number]]]
        A list of sequences, e.g. [seq1, seq2, ...]
          Each sequence contains an index pairs, or resp. a sparsity pattern
          of a mask.

    seqlen: List[int]
        Information about the original sequence lengths (e.g. number of
          tokens). It's the qudratic sparse matrix's dimension.

    maxlen : int
        Maximum length of the sequence. If len(seq)<maxlen, then padding
          is executed. If len(seq)>maxlen, then elements are truncated.

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
                new_pairs = [(r, c) for r, c in idx_pairs if c < maxlen]
            else:  # shift cols indicies to left (truncating='pre')
                n_shift = seqlen[k] - maxlen
                new_pairs = [(r, c - n_shift) for r, c in idx_pairs]
                new_pairs = [(r, c) for r, c in new_pairs if c >= 0]

        elif seqlen[k] < maxlen:  # padding
            if padding == 'pre':  # shift col indicies to right
                n_shift = maxlen - seqlen[k]
                new_pairs = [(r, c + n_shift) for r, c in idx_pairs]
            else:
                new_pairs = idx_pairs
        else:
            new_pairs = idx_pairs

        # sequence is done
        padded.append(new_pairs)

    # dataset is done
    return padded
