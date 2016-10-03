def chunks(l, n):
    """split list "l" into equal parts of "n" length"""
    n = max(1, n)
    return (l[i:i+n] for i in range(0, len(l), n))