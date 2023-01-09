<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230109111942 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE `order` (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, order_number VARCHAR(255) NOT NULL, total_amount INT NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', status VARCHAR(255) NOT NULL, updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_F5299398A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE order_item (id INT AUTO_INCREMENT NOT NULL, order_number_id INT NOT NULL, sku_id INT NOT NULL, quantity INT NOT NULL, INDEX IDX_52EA1F098C26A5E8 (order_number_id), INDEX IDX_52EA1F091777D41C (sku_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE `order` ADD CONSTRAINT FK_F5299398A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE order_item ADD CONSTRAINT FK_52EA1F098C26A5E8 FOREIGN KEY (order_number_id) REFERENCES `order` (id)');
        $this->addSql('ALTER TABLE order_item ADD CONSTRAINT FK_52EA1F091777D41C FOREIGN KEY (sku_id) REFERENCES sku (id)');
        $this->addSql('ALTER TABLE cart_item DROP FOREIGN KEY FK_F0FE25271777D41C');
        $this->addSql('ALTER TABLE cart_item DROP FOREIGN KEY FK_F0FE252745F80CD');
        $this->addSql('ALTER TABLE shopping_cart DROP FOREIGN KEY FK_72AAD4F6A76ED395');
        $this->addSql('DROP TABLE cart_item');
        $this->addSql('DROP TABLE shopping_cart');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE cart_item (id INT AUTO_INCREMENT NOT NULL, shopping_cart_id INT NOT NULL, sku_id INT NOT NULL, quantity INT NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_F0FE25271777D41C (sku_id), INDEX IDX_F0FE252745F80CD (shopping_cart_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE shopping_cart (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', edited_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', total INT DEFAULT NULL, UNIQUE INDEX UNIQ_72AAD4F6A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE cart_item ADD CONSTRAINT FK_F0FE25271777D41C FOREIGN KEY (sku_id) REFERENCES sku (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE cart_item ADD CONSTRAINT FK_F0FE252745F80CD FOREIGN KEY (shopping_cart_id) REFERENCES shopping_cart (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE shopping_cart ADD CONSTRAINT FK_72AAD4F6A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE `order` DROP FOREIGN KEY FK_F5299398A76ED395');
        $this->addSql('ALTER TABLE order_item DROP FOREIGN KEY FK_52EA1F098C26A5E8');
        $this->addSql('ALTER TABLE order_item DROP FOREIGN KEY FK_52EA1F091777D41C');
        $this->addSql('DROP TABLE `order`');
        $this->addSql('DROP TABLE order_item');
    }
}
