# Introduction
<p>This application is for my thesis (TCC). It is an application that receives and sends data to AWS DMS.
</p>

<p>
Transfer-X is an application that provides credit for all users, allowing them to transfer funds or purchase something.
</p>

## Tools
- [x] nodejs 22 or 23
- [x] asaas gateway
- [ ] terraform/aws rds and aws ec2

## Entities

- [x] users
- [ ] transactions
- [x] wallets

## Execute Terraform
```
terraform init -backend-config="backend.conf" --var-file="terraform.tfvars"
terraform plan --var-file="terraform.tfvars"
terraform apply --var-file="terraform.tfvars" -auto-approve
```