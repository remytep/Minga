<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221129105218 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE skuvalues_product_option_value DROP FOREIGN KEY FK_F9096B41EBDCCF9B');
        $this->addSql('ALTER TABLE skuvalues_product_option_value DROP FOREIGN KEY FK_F9096B4172CD813F');
        $this->addSql('DROP TABLE skuvalues_product_option_value');
        $this->addSql('ALTER TABLE skuvalues DROP FOREIGN KEY FK_9793459A9637A53A');
        $this->addSql('ALTER TABLE skuvalues DROP FOREIGN KEY FK_9793459AC964ABE2');
        $this->addSql('DROP INDEX IDX_9793459A9637A53A ON skuvalues');
        $this->addSql('DROP INDEX IDX_9793459AC964ABE2 ON skuvalues');
        $this->addSql('DROP INDEX product_option_value_id ON skuvalues');
        $this->addSql('ALTER TABLE skuvalues ADD sku_id INT DEFAULT NULL, ADD production_option_id INT DEFAULT NULL, ADD production_option_value_id INT DEFAULT NULL, DROP product_option_id, DROP s_ku_id, DROP product_option_value_id');
        $this->addSql('ALTER TABLE skuvalues ADD CONSTRAINT FK_9793459A1777D41C FOREIGN KEY (sku_id) REFERENCES sku (id)');
        $this->addSql('ALTER TABLE skuvalues ADD CONSTRAINT FK_9793459A5B4CB5 FOREIGN KEY (production_option_id) REFERENCES product_option (id)');
        $this->addSql('ALTER TABLE skuvalues ADD CONSTRAINT FK_9793459A5695A923 FOREIGN KEY (production_option_value_id) REFERENCES product_option_value (id)');
        $this->addSql('CREATE INDEX IDX_9793459A1777D41C ON skuvalues (sku_id)');
        $this->addSql('CREATE INDEX IDX_9793459A5B4CB5 ON skuvalues (production_option_id)');
        $this->addSql('CREATE INDEX IDX_9793459A5695A923 ON skuvalues (production_option_value_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE skuvalues_product_option_value (skuvalues_id INT NOT NULL, product_option_value_id INT NOT NULL, INDEX IDX_F9096B4172CD813F (skuvalues_id), INDEX IDX_F9096B41EBDCCF9B (product_option_value_id), PRIMARY KEY(skuvalues_id, product_option_value_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE skuvalues_product_option_value ADD CONSTRAINT FK_F9096B41EBDCCF9B FOREIGN KEY (product_option_value_id) REFERENCES product_option_value (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE skuvalues_product_option_value ADD CONSTRAINT FK_F9096B4172CD813F FOREIGN KEY (skuvalues_id) REFERENCES skuvalues (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE skuvalues DROP FOREIGN KEY FK_9793459A1777D41C');
        $this->addSql('ALTER TABLE skuvalues DROP FOREIGN KEY FK_9793459A5B4CB5');
        $this->addSql('ALTER TABLE skuvalues DROP FOREIGN KEY FK_9793459A5695A923');
        $this->addSql('DROP INDEX IDX_9793459A1777D41C ON skuvalues');
        $this->addSql('DROP INDEX IDX_9793459A5B4CB5 ON skuvalues');
        $this->addSql('DROP INDEX IDX_9793459A5695A923 ON skuvalues');
        $this->addSql('ALTER TABLE skuvalues ADD product_option_id INT NOT NULL, ADD s_ku_id INT NOT NULL, ADD product_option_value_id INT NOT NULL, DROP sku_id, DROP production_option_id, DROP production_option_value_id');
        $this->addSql('ALTER TABLE skuvalues ADD CONSTRAINT FK_9793459A9637A53A FOREIGN KEY (s_ku_id) REFERENCES sku (id)');
        $this->addSql('ALTER TABLE skuvalues ADD CONSTRAINT FK_9793459AC964ABE2 FOREIGN KEY (product_option_id) REFERENCES product_option (id)');
        $this->addSql('CREATE INDEX IDX_9793459A9637A53A ON skuvalues (s_ku_id)');
        $this->addSql('CREATE INDEX IDX_9793459AC964ABE2 ON skuvalues (product_option_id)');
        $this->addSql('CREATE INDEX product_option_value_id ON skuvalues (product_option_value_id)');
    }
}
