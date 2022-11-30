<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221130111004 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE skuvalues (id INT AUTO_INCREMENT NOT NULL, product_id INT NOT NULL, sku_id INT DEFAULT NULL, product_option_id INT DEFAULT NULL, product_option_value_id INT DEFAULT NULL, INDEX IDX_9793459A4584665A (product_id), INDEX IDX_9793459A1777D41C (sku_id), INDEX IDX_9793459AC964ABE2 (product_option_id), INDEX IDX_9793459AEBDCCF9B (product_option_value_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE skuvalues ADD CONSTRAINT FK_9793459A4584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE skuvalues ADD CONSTRAINT FK_9793459A1777D41C FOREIGN KEY (sku_id) REFERENCES sku (id)');
        $this->addSql('ALTER TABLE skuvalues ADD CONSTRAINT FK_9793459AC964ABE2 FOREIGN KEY (product_option_id) REFERENCES product_option (id)');
        $this->addSql('ALTER TABLE skuvalues ADD CONSTRAINT FK_9793459AEBDCCF9B FOREIGN KEY (product_option_value_id) REFERENCES product_option_value (id)');
        $this->addSql('ALTER TABLE sku_values DROP FOREIGN KEY FK_9A8AA27B4584665A');
        $this->addSql('ALTER TABLE sku_values DROP FOREIGN KEY FK_9A8AA27BC964ABE2');
        $this->addSql('ALTER TABLE sku_values DROP FOREIGN KEY FK_9A8AA27B1777D41C');
        $this->addSql('ALTER TABLE sku_values DROP FOREIGN KEY FK_9A8AA27BEBDCCF9B');
        $this->addSql('DROP TABLE sku_values');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE sku_values (id INT AUTO_INCREMENT NOT NULL, product_id INT NOT NULL, sku_id INT DEFAULT NULL, product_option_id INT DEFAULT NULL, product_option_value_id INT DEFAULT NULL, INDEX IDX_9A8AA27B4584665A (product_id), INDEX IDX_9A8AA27BC964ABE2 (product_option_id), INDEX IDX_9A8AA27B1777D41C (sku_id), INDEX IDX_9A8AA27BEBDCCF9B (product_option_value_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE sku_values ADD CONSTRAINT FK_9A8AA27B4584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE sku_values ADD CONSTRAINT FK_9A8AA27BC964ABE2 FOREIGN KEY (product_option_id) REFERENCES product_option (id)');
        $this->addSql('ALTER TABLE sku_values ADD CONSTRAINT FK_9A8AA27B1777D41C FOREIGN KEY (sku_id) REFERENCES sku (id)');
        $this->addSql('ALTER TABLE sku_values ADD CONSTRAINT FK_9A8AA27BEBDCCF9B FOREIGN KEY (product_option_value_id) REFERENCES product_option_value (id)');
        $this->addSql('ALTER TABLE skuvalues DROP FOREIGN KEY FK_9793459A4584665A');
        $this->addSql('ALTER TABLE skuvalues DROP FOREIGN KEY FK_9793459A1777D41C');
        $this->addSql('ALTER TABLE skuvalues DROP FOREIGN KEY FK_9793459AC964ABE2');
        $this->addSql('ALTER TABLE skuvalues DROP FOREIGN KEY FK_9793459AEBDCCF9B');
        $this->addSql('DROP TABLE skuvalues');
    }
}
