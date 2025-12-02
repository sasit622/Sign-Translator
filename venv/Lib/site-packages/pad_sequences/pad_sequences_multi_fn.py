from typing import Optional, List, Union
Number = Union[int, float]


def pad_sequences_multi(sequences: List[List[List[Number]]],
                        padding: Optional[str] = 'pre',
                        truncating: Optional[str] = 'pre',
                        maxlen: Optional[int] = None,
                        value: Optional[List[Number]] = None
                        ) -> List[List[List[Number]]]:
    """Pad and trunc sequences with multiple features

    Parameters:
    -----------
    sequences : List[List[List[Number]]]
        A list of sequences, e.g. [seq1, seq2, ...]
        Each sequence is a list of elements, e.g. seq1=[elem1, elem2, ..]
        An element is a list of features, e.g. elem1=[feat1, feat2, ...]
        In other words a sequence with multiple features, e.g.
            seq1=[(f11, f12, ..), (f21, f22, ..), (f31, f32, ..), ..]

    maxlen : int
        Maximum length of the sequence. If len(seq)<maxlen, then padding
          is executed. If len(seq)>maxlen, then elements are truncated.

    padding : str
        (Default 'pre')

    truncating : str
        (Default 'pre')

    value : List[Number]
        (Default 0.0)


    Returns:
    --------
    List[List[List[Number]]]
        A list of sequences.

    Notes:
    ------
    If your sequences are 1-dimensional or resp. have only 1 feature, then
      use `tf.keras.preprocessing.sequence.pad_sequences`

    """
    # use the len of the longest sequence
    if maxlen is None:
        maxlen = max([len(seq) for seq in sequences])

    # impute, e.g. (0, 0, 0), as padding value
    n_features = len(sequences[0][0])
    if value is None:
        value = [0 for _ in range(n_features)]
    if not isinstance(value, (list, tuple)):
        value = [value for _ in range(n_features)]

    # loop over all sequences
    padded = []
    for seq in sequences:
        # ensure that 1 single observation is processed as list
        if not isinstance(seq[0], (list, tuple)):
            seq = [seq]

        # convert tuple to list
        seq = list(seq)

        # Padding
        if padding == 'pre':
            seq.reverse()
        while len(seq) < maxlen:
            seq.append(value)
        if padding == 'pre':
            seq.reverse()

        # Trucation (not implemented)
        if len(seq) > maxlen:
            if truncating == 'pre':
                seq = seq[(len(seq) - maxlen):]
            if truncating == 'post':
                seq = seq[:maxlen]

        # sequence is done
        padded.append(seq)

    # dataset is done
    return padded
