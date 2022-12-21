<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221221115745 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE cart_item (id INT AUTO_INCREMENT NOT NULL, shopping_cart_id INT NOT NULL, sku_id INT NOT NULL, quantity INT NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_F0FE252745F80CD (shopping_cart_id), INDEX IDX_F0FE25271777D41C (sku_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE product (id INT AUTO_INCREMENT NOT NULL, product_sub_category_id INT NOT NULL, name VARCHAR(255) NOT NULL, slug VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, created_at DATETIME NOT NULL, featured TINYINT(1) DEFAULT NULL, thumbnail VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_D34A04AD989D9B62 (slug), INDEX IDX_D34A04ADC534EDE1 (product_sub_category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE product_category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE product_option (id INT AUTO_INCREMENT NOT NULL, product_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_38FA41144584665A (product_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE product_option_value (id INT AUTO_INCREMENT NOT NULL, product_id INT NOT NULL, product_option_id INT DEFAULT NULL, value VARCHAR(255) NOT NULL, INDEX IDX_A938C7374584665A (product_id), INDEX IDX_A938C737C964ABE2 (product_option_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE product_sub_category (id INT AUTO_INCREMENT NOT NULL, product_category_id INT NOT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_3147D5F3BE6903FD (product_category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE refresh_tokens (id INT AUTO_INCREMENT NOT NULL, refresh_token VARCHAR(128) NOT NULL, username VARCHAR(255) NOT NULL, valid DATETIME NOT NULL, UNIQUE INDEX UNIQ_9BACE7E1C74F2195 (refresh_token), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE shopping_cart (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', edited_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', total INT DEFAULT NULL, UNIQUE INDEX UNIQ_72AAD4F6A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sku (id INT AUTO_INCREMENT NOT NULL, product_id INT NOT NULL, price INT NOT NULL, stock INT NOT NULL, reference_number VARCHAR(255) NOT NULL, thumbnail VARCHAR(255) NOT NULL, INDEX IDX_F9038C44584665A (product_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sku_value (id INT AUTO_INCREMENT NOT NULL, product_id INT NOT NULL, product_option_id INT NOT NULL, product_option_value_id INT NOT NULL, sku_id INT NOT NULL, INDEX IDX_3A7BBDD44584665A (product_id), INDEX IDX_3A7BBDD4C964ABE2 (product_option_id), INDEX IDX_3A7BBDD4EBDCCF9B (product_option_value_id), INDEX IDX_3A7BBDD41777D41C (sku_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE cart_item ADD CONSTRAINT FK_F0FE252745F80CD FOREIGN KEY (shopping_cart_id) REFERENCES shopping_cart (id)');
        $this->addSql('ALTER TABLE cart_item ADD CONSTRAINT FK_F0FE25271777D41C FOREIGN KEY (sku_id) REFERENCES sku (id)');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04ADC534EDE1 FOREIGN KEY (product_sub_category_id) REFERENCES product_sub_category (id)');
        $this->addSql('ALTER TABLE product_option ADD CONSTRAINT FK_38FA41144584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE product_option_value ADD CONSTRAINT FK_A938C7374584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE product_option_value ADD CONSTRAINT FK_A938C737C964ABE2 FOREIGN KEY (product_option_id) REFERENCES product_option (id)');
        $this->addSql('ALTER TABLE product_sub_category ADD CONSTRAINT FK_3147D5F3BE6903FD FOREIGN KEY (product_category_id) REFERENCES product_category (id)');
        $this->addSql('ALTER TABLE shopping_cart ADD CONSTRAINT FK_72AAD4F6A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE sku ADD CONSTRAINT FK_F9038C44584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE sku_value ADD CONSTRAINT FK_3A7BBDD44584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE sku_value ADD CONSTRAINT FK_3A7BBDD4C964ABE2 FOREIGN KEY (product_option_id) REFERENCES product_option (id)');
        $this->addSql('ALTER TABLE sku_value ADD CONSTRAINT FK_3A7BBDD4EBDCCF9B FOREIGN KEY (product_option_value_id) REFERENCES product_option_value (id)');
        $this->addSql('ALTER TABLE sku_value ADD CONSTRAINT FK_3A7BBDD41777D41C FOREIGN KEY (sku_id) REFERENCES sku (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE cart_item DROP FOREIGN KEY FK_F0FE252745F80CD');
        $this->addSql('ALTER TABLE cart_item DROP FOREIGN KEY FK_F0FE25271777D41C');
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04ADC534EDE1');
        $this->addSql('ALTER TABLE product_option DROP FOREIGN KEY FK_38FA41144584665A');
        $this->addSql('ALTER TABLE product_option_value DROP FOREIGN KEY FK_A938C7374584665A');
        $this->addSql('ALTER TABLE product_option_value DROP FOREIGN KEY FK_A938C737C964ABE2');
        $this->addSql('ALTER TABLE product_sub_category DROP FOREIGN KEY FK_3147D5F3BE6903FD');
        $this->addSql('ALTER TABLE shopping_cart DROP FOREIGN KEY FK_72AAD4F6A76ED395');
        $this->addSql('ALTER TABLE sku DROP FOREIGN KEY FK_F9038C44584665A');
        $this->addSql('ALTER TABLE sku_value DROP FOREIGN KEY FK_3A7BBDD44584665A');
        $this->addSql('ALTER TABLE sku_value DROP FOREIGN KEY FK_3A7BBDD4C964ABE2');
        $this->addSql('ALTER TABLE sku_value DROP FOREIGN KEY FK_3A7BBDD4EBDCCF9B');
        $this->addSql('ALTER TABLE sku_value DROP FOREIGN KEY FK_3A7BBDD41777D41C');
        $this->addSql('DROP TABLE cart_item');
        $this->addSql('DROP TABLE product');
        $this->addSql('DROP TABLE product_category');
        $this->addSql('DROP TABLE product_option');
        $this->addSql('DROP TABLE product_option_value');
        $this->addSql('DROP TABLE product_sub_category');
        $this->addSql('DROP TABLE refresh_tokens');
        $this->addSql('DROP TABLE shopping_cart');
        $this->addSql('DROP TABLE sku');
        $this->addSql('DROP TABLE sku_value');
        $this->addSql('DROP TABLE user');
    }
}
