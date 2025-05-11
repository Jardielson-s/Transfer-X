variable "region" {
  type        = string
  description = "AWS region"
  default     = "us-east-1"
}

variable "s3_bucket_name" {
  type        = string
  description = "AWS bucket to save terraform state"
  default     = "terraform-state-ecs-bucket"
}

variable "env" {
  type        = string
  description = "Envirionment"
  default     = "dev"
}

variable "access_key" {
  type        = string
  description = "aws access key"
  nullable    = false
}

variable "secret_key" {
  type        = string
  description = "aws secret key"
  nullable    = false
}

variable "public_key_to_pair_key" {
  type        = string
  description = "Public key to pair key for connect with ec2"
  nullable    = false
}

variable "vpc_default_id" {
  type        = string
  description = "id from vpc default"
  nullable    = false
}

variable "vpc_default_public_subnet_id" {
  type        = string
  description = "subnet public id from vpc default"
  nullable    = false
}

variable "postgres_host" {
  type        = string
  description = "posgres host"
  nullable    = false
}

variable "postgres_port" {
  type        = number
  description = "posgres port"
  nullable    = false
}

variable "postgres_username" {
  type        = string
  description = "posgres username"
  nullable    = false
}

variable "postgres_password" {
  type        = string
  description = "posgres password"
  nullable    = false
}

variable "postgres_database" {
  type        = string
  description = "posgres database"
  nullable    = false
}

variable "asaas_api_url" {
  type        = string
  description = "asaas api url"
  nullable    = false
}

variable "asaas_api_token" {
  type        = string
  description = "asaas api token"
  nullable    = false
}

variable "asaas_api_wallet_id" {
  type        = string
  description = "asaas api wallet id"
  nullable    = false
}
