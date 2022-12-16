<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221130162536 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE product_option_value (id INT AUTO_INCREMENT NOT NULL, product_id INT NOT NULL, product_option_id INT NOT NULL, value VARCHAR(255) NOT NULL, INDEX IDX_A938C7374584665A (product_id), INDEX IDX_A938C737C964ABE2 (product_option_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sku (id INT AUTO_INCREMENT NOT NULL, product_id INT NOT NULL, price INT NOT NULL, stock INT NOT NULL, reference_number VARCHAR(255) NOT NULL, INDEX IDX_F9038C44584665A (product_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sku_value (id INT AUTO_INCREMENT NOT NULL, product_id INT NOT NULL, product_option_id INT NOT NULL, product_option_value_id INT NOT NULL, sku_id INT NOT NULL, INDEX IDX_3A7BBDD44584665A (product_id), INDEX IDX_3A7BBDD4C964ABE2 (product_option_id), INDEX IDX_3A7BBDD4EBDCCF9B (product_option_value_id), INDEX IDX_3A7BBDD41777D41C (sku_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE product_option_value ADD CONSTRAINT FK_A938C7374584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE product_option_value ADD CONSTRAINT FK_A938C737C964ABE2 FOREIGN KEY (product_option_id) REFERENCES product_option (id)');
        $this->addSql('ALTER TABLE sku ADD CONSTRAINT FK_F9038C44584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE sku_value ADD CONSTRAINT FK_3A7BBDD44584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE sku_value ADD CONSTRAINT FK_3A7BBDD4C964ABE2 FOREIGN KEY (product_option_id) REFERENCES product_option (id)');
        $this->addSql('ALTER TABLE sku_value ADD CONSTRAINT FK_3A7BBDD4EBDCCF9B FOREIGN KEY (product_option_value_id) REFERENCES product_option_value (id)');
        $this->addSql('ALTER TABLE sku_value ADD CONSTRAINT FK_3A7BBDD41777D41C FOREIGN KEY (sku_id) REFERENCES sku (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product_option_value DROP FOREIGN KEY FK_A938C7374584665A');
        $this->addSql('ALTER TABLE product_option_value DROP FOREIGN KEY FK_A938C737C964ABE2');
        $this->addSql('ALTER TABLE sku DROP FOREIGN KEY FK_F9038C44584665A');
        $this->addSql('ALTER TABLE sku_value DROP FOREIGN KEY FK_3A7BBDD44584665A');
        $this->addSql('ALTER TABLE sku_value DROP FOREIGN KEY FK_3A7BBDD4C964ABE2');
        $this->addSql('ALTER TABLE sku_value DROP FOREIGN KEY FK_3A7BBDD4EBDCCF9B');
        $this->addSql('ALTER TABLE sku_value DROP FOREIGN KEY FK_3A7BBDD41777D41C');
        $this->addSql('DROP TABLE product_option_value');
        $this->addSql('DROP TABLE sku');
        $this->addSql('DROP TABLE sku_value');
    }
}
