resource "aws_instance" "ubuntu_instance" {
  ami                         = "ami-0a0e5d9c7acc336f1"
  instance_type               = "t2.micro"
  subnet_id                   = var.vpc_default_public_subnet_id
  vpc_security_group_ids      = [aws_security_group.allow_access_types.id]
  key_name                    = aws_key_pair.key_pair_aws_intance.key_name
  associate_public_ip_address = true

  depends_on = [
    aws_security_group.allow_access_types
  ]

  user_data = <<-EOF
              #!/bin/bash
              sudo apt update -y
              sudo apt install -y nginx

              # Create index.html with H1 tag in the default NGINX web directory
              echo "<h1>Hello From Ubuntu EC2 Instance!!!</h1>" | sudo tee /var/www/html/index.html

              # Update NGINX to listen on port 3000
              sudo sed -i 's/listen 80 default_server;/listen 3000 default_server;/g' /etc/nginx/sites-available/default

              # Restart NGINX to apply the changes
              sudo systemctl restart nginx

              # NodeJs
              sudo wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.39.3/install.sh | bash
              sudo ource ~/.profile
              sudo nvm install 23

              # Docker
              sudo sudo apt-get install docker.io

              # Docker Compose
              sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              sudo chmod +x /usr/local/bin/docker-compose
              sudo groupadd docker
              sudo usermod -aG docker $USER
              sudo reboot
              git clone https://github.com/Jardielson-s/Transfer-X.git
              cd Transfer-X
              sudo npm i

              EOF

  tags = {
    Name = "ubuntu-instance"
  }
}


resource "aws_security_group" "allow_access_types" {
  name   = "allow_access_types"
  vpc_id = var.vpc_default_id
  ingress {
    description = "SSH to ec2"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    # ipv6_cidr_blocks = ["::/0"]
  }

  ingress {
    description = "HTTP to ec2"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    # ipv6_cidr_blocks = ["::/0"]
  }

  ingress {
    description = "HTTPS to ec2"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    # ipv6_cidr_blocks = ["::/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    # ipv6_cidr_blocks = ["::/0"] # Allow outgoing traffic to any IPv6 address
  }
}
