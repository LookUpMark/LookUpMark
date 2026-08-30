# Hi, I'm Marco — Marc'Antonio Lopez

ML Engineer at Intesa Sanpaolo's AI Delivery Center, finishing my M.Sc. in Artificial Intelligence & Data Analytics at Politecnico di Torino. My thesis, developed as a graduate intern at Data Reply, focuses on production-oriented GenAI for metadata management.

Most of my work sits between LLMs and the plumbing around them: RAG pipelines with LangGraph, fine-tuning with PEFT/LoRA, retrieval quality (hybrid search, reranking), and the boring-but-important parts like evaluation and quantization for hardware that isn't a datacenter.

[Portfolio](https://lookupmark.github.io) · [LinkedIn](https://linkedin.com/in/marc-antonio-lopez) · [Kaggle](https://kaggle.com/marcantoniolopez)

---

## Projects

**[SemanticMesh](https://github.com/LookUpMark/semanticmesh)** — M.Sc. thesis project
LangGraph multi-agent system for data governance: it aligns business documents with relational schemas in a Neo4j knowledge graph. A builder pipeline handles triplet extraction, entity resolution, actor-critic validation and Cypher healing; a query graph combines dense + BM25 + graph traversal with cross-encoder reranking and hallucination grading. Evaluated on 7 datasets, 111 tables, 210 questions: 210/210 grounded answers, zero hallucinations.

**[Multi-Turn Self-Corrective RAG](https://github.com/LookUpMark/semeval-2026-task-8)** — SemEval 2026 Task 8
Self-CRAG system with LangGraph for grounded multi-turn answers. Hybrid retrieval with parent-child chunking, BGE-M3 embeddings and cross-encoder reranking, feeding a 4-bit quantized Llama 3.1 8B for fully offline inference on consumer hardware.

**[SM-SIP](https://github.com/LookUpMark/sm-sip)** — multilingual abstractive summarization
Controllable summarization with semantic supervision. IT/EN pipeline on Llama and Qwen, with token-classification modules that flag hallucination-prone spans before generation. Package and LoRA adapters (PEFT) on the Hugging Face Hub.

**[Concept Discovery for Medical VLMs](https://github.com/LookUpMark/xai-project-5)** — explainability
Unsupervised concept discovery in medical vision-language models via Sparse Autoencoders, with a concept-naming module and an LLM-as-a-judge setup to measure how faithful the concepts actually are.

**[DYLEM-GRID](https://github.com/LookUpMark/dylem-grid)** — gesture recognition
BiLSTM with attention and an encoder-only Transformer for dynamic hand-gesture classification from Leap Motion time series. The dataset (400 gestures, 100 participants) is [on Kaggle](https://www.kaggle.com/datasets/marcantoniolopez/dylem-grid).

---

## Stack

**Core:** Python, PyTorch, Hugging Face, LangChain / LangGraph, Pandas, Scikit-learn
**LLM work:** RAG, fine-tuning, PEFT / LoRA, quantization, prompt engineering, hybrid retrieval and reranking
**Ops & tools:** Docker, Git, Weights & Biases, SQL, Claude Code, Copilot

---

## Education

- **M.Sc. Artificial Intelligence & Data Analytics**, Politecnico di Torino (2024–2026, expected 110/110)
  Thesis: *Generative AI and Foundation Models for Automated Data Engineering and Metadata Orchestration*
- **B.Sc. Computer Engineering**, University of Enna "Kore" (110/110 cum laude)
  Thesis: *Recurrent Neural Networks for Dynamic Gesture Recognition*

Cambridge English C1 Advanced (2024).

---

## Contact

[![LinkedIn](https://img.shields.io/badge/LinkedIn-marc--antonio--lopez-0077B5?logo=linkedin&logoColor=white)](https://linkedin.com/in/marc-antonio-lopez)
[![Email](https://img.shields.io/badge/IEEE-marcantonio.lopez%40ieee.org-00629B?logo=ieee&logoColor=white)](mailto:marcantonio.lopez@ieee.org)
[![Email](https://img.shields.io/badge/Gmail-marcantoniolopez0%40gmail.com-D14836?logo=gmail&logoColor=white)](mailto:marcantoniolopez0@gmail.com)
[![Kaggle](https://img.shields.io/badge/Kaggle-marcantoniolopez-20BEFF?logo=kaggle&logoColor=white)](https://kaggle.com/marcantoniolopez)
