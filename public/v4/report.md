# mentee-embed Full Benchmark Report

Generated: 2026-08-28 23:17 UTC

Device: cuda

---

## MenteE Embed Bench (Custom EN/AR/UR Pilot)

*121 queries · 18 domains · dialect Arabic · Roman Urdu · hard negatives*


| Model | Params | EN MRR@10 | AR MRR@10 | UR MRR@10 | Dialect AR | Roman UR | All MRR@10 | NDCG@10 |
|---|---|---|---|---|---|---|---|---|
| mentee-embed-v4 | 41.0 | 0.3689 | 0.1203 | 0.2611 | 0.0951 | 0.3991 | 0.252 | 0.2379 |
| mentee-embed-v3 | 41.0 | 0.2248 | 0.0208 | 0.0546 | 0.0 | 0.0792 | 0.1025 | 0.1466 |
| all-MiniLM-L6-v2 | 22.7 | 0.873 | 0.0868 | 0.2885 | 0.0839 | 0.4861 | 0.4247 | 0.2988 |
| paraphrase-MiniLM-L12-v2 | 117.7 | 0.682 | 0.5684 | 0.5191 | 0.3853 | 0.4802 | 0.5919 | 0.6338 |
| paraphrase-mpnet-base-v2 | 278.0 | 0.7643 | 0.6015 | 0.6114 | 0.4454 | 0.6607 | 0.6612 | 0.7136 |
| multilingual-e5-base | 278.0 | 0.6665 | 0.3516 | 0.4129 | 0.3102 | 0.4301 | 0.4807 | 0.4698 |
| multilingual-e5-small | 117.7 | 0.6584 | 0.2597 | 0.1713 | 0.1863 | 0.1765 | 0.3696 | 0.3821 |
| bge-small-en-v1.5 | 33.4 | 0.7044 | 0.2291 | 0.2051 | 0.2006 | 0.3426 | 0.3863 | 0.2819 |

---

## Speed (RTX 5090)


| Model | Params | Sents/sec (bs=1) | Sents/sec (bs=128) | Tokens/sec | Latency@1 (ms) | Load time (s) |
|---|---|---|---|---|---|---|
| mentee-embed-v4 | 41.0 | 194.3 | 18114.7 | 326064.0 | 5.15 | 0.74 |
| mentee-embed-v3 | 41.0 | 191.1 | 16950.8 | 305113.5 | 5.23 | 0.91 |
| all-MiniLM-L6-v2 | 22.7 | 212.3 | 12445.3 | 224016.0 | 4.71 | 6.87 |
| paraphrase-MiniLM-L12-v2 | 117.7 | 122.4 | 9455.6 | 170200.3 | 8.17 | 6.02 |
| paraphrase-mpnet-base-v2 | 278.0 | 124.4 | 5157.6 | 92835.9 | 8.04 | 6.51 |
| multilingual-e5-base | 278.0 | 123.9 | 5378.7 | 96817.0 | 8.07 | 6.87 |
| multilingual-e5-small | 117.7 | 126.9 | 9749.3 | 175487.2 | 7.88 | 7.9 |
| bge-small-en-v1.5 | 33.4 | 127.3 | 9333.7 | 168006.8 | 7.86 | 3.88 |

---

## Cost (RTX 5090 @ $0.466/hr)


| Model | Cost/1M sents | Cost/1B sents | Time for 1M | Time for 1B |
|---|---|---|---|---|
| mentee-embed-v4 | $0.0071 | $7.15 | 55.2s | 15.33hr |
| mentee-embed-v3 | $0.0076 | $7.64 | 59.0s | 16.39hr |
| all-MiniLM-L6-v2 | $0.0104 | $10.4 | 1.3min | 22.32hr |
| paraphrase-MiniLM-L12-v2 | $0.0137 | $13.69 | 1.8min | 29.38hr |
| paraphrase-mpnet-base-v2 | $0.0251 | $25.1 | 3.2min | 53.86hr |
| multilingual-e5-base | $0.0241 | $24.07 | 3.1min | 51.64hr |
| multilingual-e5-small | $0.0133 | $13.28 | 1.7min | 28.49hr |
| bge-small-en-v1.5 | $0.0139 | $13.87 | 1.8min | 29.76hr |

---

## Efficiency


| Model | Params | Bench MRR/1M params | Prot-C MRR/1M params | Sents/sec per 1M params |
|---|---|---|---|---|
| mentee-embed-v4 | 41.0 | 0.525 | 1.723 | 441.82 |
| mentee-embed-v3 | 41.0 | 0.211 | 1.444 | 413.43 |
| all-MiniLM-L6-v2 | 22.7 | 1.922 | 3.865 | 548.25 |
| paraphrase-MiniLM-L12-v2 | 117.7 | 0.452 | 0.679 | 80.34 |
| paraphrase-mpnet-base-v2 | 278.0 | 0.224 | 0.289 | 18.55 |
| multilingual-e5-base | 278.0 | 0.166 | 0.308 | 19.35 |
| multilingual-e5-small | 117.7 | 0.291 | 0.707 | 82.83 |
| bge-small-en-v1.5 | 33.4 | 1.22 | 2.593 | 279.45 |