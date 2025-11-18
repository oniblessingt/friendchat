Here is a **clean, professional description** for your repository.
You can use this in:

* GitHub repo description
* Bitbucket repo summary
* Azure DevOps project description
* Internal documentation



# ** Repository Description **

**FriendChat Cloud Native Application**

This repository contains **FriendChat**, a lightweight cloud-native web application designed for two friends to chat within a single browser session. The application is fully front-end, served via **Nginx**, packaged as a **Docker** image, and deployed on **Azure Kubernetes Service (AKS)** using a complete **GitOps pipeline powered by Argo CD**.

The repository includes the full end-to-end architecture required to run the app in a modern production-grade Kubernetes environment, including:

* **Nginx-based static web application** (HTML, CSS, JavaScript)
* **Dockerfile** for containerized packaging
* **Kubernetes manifests** for Deployment, Service, and optional Ingress
* **Argo CD configuration** for continuous delivery and environment automation
* **Monitoring stack configuration** using Prometheus (metrics scraping) and Grafana (dashboards)
* **Namespace-separated environment structure**, suitable for dev, staging, and production setups

FriendChat demonstrates a complete cloud-native DevOps workflow integrating:

* Containerization
* Kubernetes orchestration
* GitOps automation
* Observability & metrics
* Modern frontend UX

This repo is ideal for engineers who want to learn or showcase end-to-end cloud-native architecture with AKS, Nginx, Argo CD, Prometheus, and Grafana.
