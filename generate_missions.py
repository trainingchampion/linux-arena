import json
import os

games = {
    "devsecops": {
        "export_name": "DEVSECOPS_MISSIONS",
        "file_name": "devsecopsMissions.ts",
        "commands": [
            {"lesson": "nmap scans ports.", "question": "Scan localhost", "answer": "nmap localhost", "output": "80/tcp open", "why": "nmap maps network surfaces."},
            {"lesson": "trivy analyzes images.", "question": "Scan nginx image", "answer": "trivy image nginx", "output": "0 HIGH, 0 CRITICAL", "why": "trivy finds container CVEs."},
            {"lesson": "docker-bench checks host.", "question": "Run docker bench", "answer": "docker-bench-security", "output": "Checks passed", "why": "Ensures Docker daemon is secure."},
            {"lesson": "sqlmap tests injection.", "question": "Test local app for SQLi", "answer": "sqlmap -u http://localhost", "output": "Not vulnerable", "why": "sqlmap automates SQL injection detection."},
            {"lesson": "chmod secures files.", "question": "Secure private key", "answer": "chmod 400 key.pem", "output": "Permissions updated", "why": "Keys must not be world-readable."},
            {"lesson": "checkov scans IaC.", "question": "Scan terraform", "answer": "checkov -d .", "output": "Passed checks", "why": "checkov finds misconfigurations in IaC."},
            {"lesson": "grep finds secrets.", "question": "Search for AWS keys", "answer": "grep -r AKIA .", "output": "No results", "why": "Hardcoded secrets are a major risk."},
            {"lesson": "ufw configures firewall.", "question": "Allow port 443", "answer": "ufw allow 443", "output": "Rule added", "why": "Firewalls restrict unnecessary access."},
            {"lesson": "fail2ban stops bruteforce.", "question": "Start fail2ban", "answer": "systemctl start fail2ban", "output": "Started", "why": "fail2ban blocks malicious IPs."},
            {"lesson": "auditd monitors files.", "question": "Check audit logs", "answer": "aureport", "output": "Report generated", "why": "auditd tracks system access."}
        ]
    },
    "kubernetes": {
        "export_name": "KUBERNETES_MISSIONS",
        "file_name": "kubernetesMissions.ts",
        "commands": [
            {"lesson": "kubectl get pods.", "question": "List all pods", "answer": "kubectl get pods", "output": "NAME READY STATUS RESTARTS AGE", "why": "Shows running pods."},
            {"lesson": "kubectl get nodes.", "question": "List cluster nodes", "answer": "kubectl get nodes", "output": "node-1 Ready", "why": "Shows cluster infrastructure."},
            {"lesson": "kubectl create ns.", "question": "Create dev namespace", "answer": "kubectl create namespace dev", "output": "namespace/dev created", "why": "Namespaces isolate resources."},
            {"lesson": "kubectl apply deploys resources.", "question": "Apply pod.yaml", "answer": "kubectl apply -f pod.yaml", "output": "pod created", "why": "Declarative configuration management."},
            {"lesson": "kubectl logs views output.", "question": "View web-pod logs", "answer": "kubectl logs web-pod", "output": "Server listening on port 80", "why": "Logs are essential for debugging."},
            {"lesson": "kubectl describe shows details.", "question": "Describe running pod", "answer": "kubectl describe pod my-pod", "output": "Events: Normal", "why": "Provides detailed resource state."},
            {"lesson": "kubectl scale replicas.", "question": "Scale deployment to 3", "answer": "kubectl scale deploy/web --replicas=3", "output": "scaled", "why": "Adjusts application capacity."},
            {"lesson": "kubectl port-forward.", "question": "Forward port 8080", "answer": "kubectl port-forward svc/web 8080:80", "output": "Forwarding from 127.0.0.1:8080", "why": "Accesses internal services locally."},
            {"lesson": "kubectl delete removes resources.", "question": "Delete test pod", "answer": "kubectl delete pod test", "output": "deleted", "why": "Cleans up unused resources."},
            {"lesson": "kubectl get svc.", "question": "List services", "answer": "kubectl get svc", "output": "kubernetes ClusterIP", "why": "Shows network routing."}
        ]
    },
    "cloudarchitect": {
        "export_name": "CLOUD_ARCHITECT_MISSIONS",
        "file_name": "cloudArchitectMissions.ts",
        "commands": [
            {"lesson": "terraform init prepares working dir.", "question": "Initialize terraform", "answer": "terraform init", "output": "Terraform has been successfully initialized!", "why": "Downloads required providers."},
            {"lesson": "terraform plan previews changes.", "question": "Plan infrastructure", "answer": "terraform plan", "output": "Plan: 1 to add", "why": "Shows what will be changed."},
            {"lesson": "terraform apply executes plan.", "question": "Apply changes", "answer": "terraform apply -auto-approve", "output": "Apply complete! Resources: 1 added.", "why": "Deploys infrastructure to cloud."},
            {"lesson": "aws ec2 describe locates vms.", "question": "List EC2 instances", "answer": "aws ec2 describe-instances", "output": "InstanceId: i-123", "why": "Verifies deployed compute."},
            {"lesson": "aws s3 ls lists buckets.", "question": "List S3 buckets", "answer": "aws s3 ls", "output": "2026-01-01 my-bucket", "why": "Verifies storage."},
            {"lesson": "terraform destroy cleans up.", "question": "Destroy infrastructure", "answer": "terraform destroy -auto-approve", "output": "Destroy complete!", "why": "Prevents unexpected cloud costs."},
            {"lesson": "terraform validate checks syntax.", "question": "Validate config", "answer": "terraform validate", "output": "Success! The configuration is valid.", "why": "Catches typos before planning."},
            {"lesson": "terraform state list.", "question": "List tracked resources", "answer": "terraform state list", "output": "aws_instance.web", "why": "Shows what terraform is managing."},
            {"lesson": "aws sts get-caller-identity.", "question": "Check AWS credentials", "answer": "aws sts get-caller-identity", "output": "UserId: AIDA...", "why": "Verifies active AWS account."},
            {"lesson": "terraform output shows variables.", "question": "Display outputs", "answer": "terraform output", "output": "ip = 10.0.0.1", "why": "Retrieves useful deployment data."}
        ]
    },
    "docker": {
        "export_name": "DOCKER_MISSIONS",
        "file_name": "dockerMissions.ts",
        "commands": [
            {"lesson": "docker build creates images.", "question": "Build current directory", "answer": "docker build -t myapp .", "output": "Successfully built", "why": "Creates an image from a Dockerfile."},
            {"lesson": "docker run starts containers.", "question": "Run myapp image", "answer": "docker run -d myapp", "output": "Container running", "why": "Executes the compiled image."},
            {"lesson": "docker ps lists active.", "question": "List running containers", "answer": "docker ps", "output": "CONTAINER ID IMAGE", "why": "Monitors active processes."},
            {"lesson": "docker pull gets images.", "question": "Download ubuntu image", "answer": "docker pull ubuntu", "output": "Downloaded newer image", "why": "Fetches images from registries."},
            {"lesson": "docker exec runs commands inside.", "question": "Open sh in container web", "answer": "docker exec -it web sh", "output": "/ #", "why": "Allows debugging inside containers."},
            {"lesson": "docker logs shows output.", "question": "View web container logs", "answer": "docker logs web", "output": "Listening on port 80", "why": "Accesses application stdout."},
            {"lesson": "docker stop halts.", "question": "Stop container web", "answer": "docker stop web", "output": "web stopped", "why": "Gracefully shuts down container."},
            {"lesson": "docker rm deletes.", "question": "Remove container web", "answer": "docker rm web", "output": "web removed", "why": "Frees up system resources."},
            {"lesson": "docker rmi deletes images.", "question": "Remove ubuntu image", "answer": "docker rmi ubuntu", "output": "Untagged: ubuntu", "why": "Frees up disk space."},
            {"lesson": "docker-compose up starts stacks.", "question": "Start docker compose", "answer": "docker-compose up -d", "output": "Started all services", "why": "Manages multi-container apps."}
        ]
    },
    "cicd": {
        "export_name": "CICD_MISSIONS",
        "file_name": "cicdMissions.ts",
        "commands": [
            {"lesson": "git status checks branch.", "question": "Check git status", "answer": "git status", "output": "On branch main", "why": "Verifies working tree state."},
            {"lesson": "git add stages files.", "question": "Stage all files", "answer": "git add .", "output": "Files staged", "why": "Prepares changes for commit."},
            {"lesson": "git commit records changes.", "question": "Commit with message 'fix'", "answer": "git commit -m 'fix'", "output": "1 file changed", "why": "Saves changes to history."},
            {"lesson": "git push triggers pipelines.", "question": "Push to main", "answer": "git push origin main", "output": "Pushed to remote", "why": "Uploads code and starts CI."},
            {"lesson": "gh run list checks CI.", "question": "List github actions", "answer": "gh run list", "output": "Deploy - passing", "why": "Monitors CI/CD progress."},
            {"lesson": "argo get checks CD.", "question": "Check argocd status", "answer": "argocd app get myapp", "output": "Healthy / Synced", "why": "Verifies GitOps deployment."},
            {"lesson": "argo sync deploys.", "question": "Sync argocd app", "answer": "argocd app sync myapp", "output": "Sync successful", "why": "Forces manual CD deployment."},
            {"lesson": "npm test validates code.", "question": "Run unit tests", "answer": "npm test", "output": "All tests passed", "why": "Ensures code quality before release."},
            {"lesson": "docker build triggers in CI.", "question": "Build release image", "answer": "docker build -t app:release .", "output": "Built successfully", "why": "Packages app for CD."},
            {"lesson": "git pull updates local.", "question": "Pull latest changes", "answer": "git pull", "output": "Already up to date", "why": "Syncs local with remote branch."}
        ]
    },
    "aiops": {
        "export_name": "AIOPS_MISSIONS",
        "file_name": "aiopsMissions.ts",
        "commands": [
            {"lesson": "Analyze logs with LLM.", "question": "Send error.log to AI", "answer": "cat error.log | ai analyze", "output": "AI: Null pointer exception found", "why": "AI accelerates log debugging."},
            {"lesson": "Generate remediation script.", "question": "Ask AI to fix Nginx", "answer": "ai fix nginx 502", "output": "AI: Restarting php-fpm...", "why": "Automates incident resolution."},
            {"lesson": "Query metrics naturally.", "question": "Check CPU using NLP", "answer": "ai 'how is CPU usage?'", "output": "AI: CPU is currently at 45%", "why": "Simplifies observability."},
            {"lesson": "Auto-heal triggers.", "question": "Enable auto-remediation", "answer": "ai enable auto-heal", "output": "Auto-healing activated", "why": "Reduces manual intervention."},
            {"lesson": "Detect anomalies.", "question": "Run anomaly detection", "answer": "ai detect anomalies", "output": "No anomalies found", "why": "Identifies unusual traffic patterns."},
            {"lesson": "Generate IaC.", "question": "Generate S3 bucket terraform", "answer": "ai 'create s3 terraform'", "output": "resource 'aws_s3_bucket'...", "why": "Speeds up infrastructure provisioning."},
            {"lesson": "Review alert confidence.", "question": "Check alert score", "answer": "ai alert-score 1004", "output": "Confidence: 98% (True Positive)", "why": "Filters out alert fatigue/noise."},
            {"lesson": "Summarize incident.", "question": "Generate incident report", "answer": "ai summarize-incident INC-12", "output": "Report: Outage caused by DB lock", "why": "Automates post-mortem documentation."},
            {"lesson": "Optimize costs.", "question": "Ask AI for cost savings", "answer": "ai 'how to save AWS costs?'", "output": "AI: Downsize EC2 instance i-123", "why": "Identifies underutilized resources."},
            {"lesson": "Predict capacity.", "question": "Run capacity forecast", "answer": "ai forecast storage", "output": "Storage full in 45 days", "why": "Prevents future outages."}
        ]
    },
    "database": {
        "export_name": "DATABASE_MISSIONS",
        "file_name": "databaseMissions.ts",
        "commands": [
            {"lesson": "psql connects to postgres.", "question": "Connect to default DB", "answer": "psql", "output": "psql (14.2)", "why": "Opens SQL terminal."},
            {"lesson": "pg_dump backups databases.", "question": "Backup mydb", "answer": "pg_dump mydb > backup.sql", "output": "Dumped successfully", "why": "Prevents data loss."},
            {"lesson": "SELECT queries data.", "question": "Select all from users", "answer": "SELECT * FROM users;", "output": "100 rows fetched", "why": "Retrieves table records."},
            {"lesson": "EXPLAIN analyzes queries.", "question": "Explain SELECT query", "answer": "EXPLAIN SELECT * FROM users;", "output": "Seq Scan on users", "why": "Helps optimize slow queries."},
            {"lesson": "redis-cli connects to Redis.", "question": "Ping redis", "answer": "redis-cli ping", "output": "PONG", "why": "Verifies Cache connectivity."},
            {"lesson": "redis GET fetches cache.", "question": "Get 'session_1' key", "answer": "redis-cli get session_1", "output": "'active'", "why": "Retrieves cached values."},
            {"lesson": "mongosh connects to Mongo.", "question": "Open mongo shell", "answer": "mongosh", "output": "Connected to mongodb", "why": "Accesses NoSQL database."},
            {"lesson": "db.collection.find()", "question": "Find users in Mongo", "answer": "db.users.find()", "output": "Documents returned", "why": "Queries JSON documents."},
            {"lesson": "CREATE INDEX speeds up DB.", "question": "Index email column", "answer": "CREATE INDEX idx_email ON users(email);", "output": "Index created", "why": "Improves query performance."},
            {"lesson": "pg_restore imports data.", "question": "Restore backup to mydb", "answer": "pg_restore -d mydb backup.sql", "output": "Restored successfully", "why": "Recovers database from file."}
        ]
    },
    "codereview": {
        "export_name": "CODE_REVIEW_MISSIONS",
        "file_name": "codeReviewMissions.ts",
        "commands": [
            {"lesson": "eslint checks JS code.", "question": "Run standard linter", "answer": "eslint src/", "output": "0 errors, 0 warnings", "why": "Enforces code style."},
            {"lesson": "sonar-scanner checks quality.", "question": "Run sonarqube scan", "answer": "sonar-scanner", "output": "Quality Gate: Passed", "why": "Detects bugs and code smells."},
            {"lesson": "git diff shows changes.", "question": "Show uncommitted changes", "answer": "git diff", "output": "- var x = 1\n+ const x = 1", "why": "Reviews code modifications."},
            {"lesson": "npm audit finds JS vulnerabilities.", "question": "Audit npm packages", "answer": "npm audit", "output": "found 0 vulnerabilities", "why": "Secures third-party dependencies."},
            {"lesson": "bandit checks Python security.", "question": "Run python security scan", "answer": "bandit -r .", "output": "No issues found", "why": "Finds common security flaws in Python."},
            {"lesson": "jest runs tests.", "question": "Run test suite", "answer": "jest", "output": "Test Suites: 10 passed", "why": "Ensures code doesn't break functionality."},
            {"lesson": "Prettier formats code.", "question": "Auto-format src folder", "answer": "npx prettier --write src/", "output": "src/index.js formatted", "why": "Maintains readable codebase."},
            {"lesson": "git blame traces authors.", "question": "See who changed auth.js", "answer": "git blame auth.js", "output": "Commit abc123 by Alice", "why": "Tracks origin of specific code lines."},
            {"lesson": "Code coverage.", "question": "Check test coverage", "answer": "jest --coverage", "output": "Statements: 95%", "why": "Ensures new code is tested."},
            {"lesson": "Detect leaked secrets.", "question": "Run gitleaks", "answer": "gitleaks detect", "output": "No leaks found", "why": "Prevents credentials reaching production."}
        ]
    }
}

target_dir = "../webuprade/data"
os.makedirs(target_dir, exist_ok=True)

difficulties = ["Beginner"] * 25 + ["Intermediate"] * 50 + ["Advanced"] * 15 + ["Hero"] * 10

for game_key, game_data in games.items():
    missions = []
    cmds = game_data["commands"]
    for i in range(100):
        base = cmds[i % len(cmds)]
        diff = difficulties[i]
        
        q = base["question"]
        if i >= len(cmds):
            q = f"{q} (Lvl {i+1})"
            
        missions.append({
            "id": i + 1,
            "lesson": base["lesson"],
            "question": q,
            "answer": base["answer"],
            "output": base["output"],
            "why": base["why"],
            "difficulty": diff
        })
        
    file_path = os.path.join(target_dir, game_data["file_name"])
    with open(file_path, "w") as f:
        json_data = json.dumps(missions, indent=2)
        f.write(f"export const {game_data['export_name']} = {json_data};\n")

print("Generated all mission files.")
