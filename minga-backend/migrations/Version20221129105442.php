<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221129105442 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE skuvalues DROP FOREIGN KEY FK_9793459A5695A923');
        $this->addSql('ALTER TABLE skuvalues DROP FOREIGN KEY FK_9793459A5B4CB5');
        $this->addSql('DROP INDEX IDX_9793459A5B4CB5 ON skuvalues');
        $this->addSql('DROP INDEX IDX_9793459A5695A923 ON skuvalues');
        $this->addSql('ALTER TABLE skuvalues ADD product_option_id INT DEFAULT NULL, ADD product_option_value_id INT DEFAULT NULL, DROP production_option_id, DROP production_option_value_id');
        $this->addSql('ALTER TABLE skuvalues ADD CONSTRAINT FK_9793459AC964ABE2 FOREIGN KEY (product_option_id) REFERENCES product_option (id)');
        $this->addSql('ALTER TABLE skuvalues ADD CONSTRAINT FK_9793459AEBDCCF9B FOREIGN KEY (product_option_value_id) REFERENCES product_option_value (id)');
        $this->addSql('CREATE INDEX IDX_9793459AC964ABE2 ON skuvalues (product_option_id)');
        $this->addSql('CREATE INDEX IDX_9793459AEBDCCF9B ON skuvalues (product_option_value_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE skuvalues DROP FOREIGN KEY FK_9793459AC964ABE2');
        $this->addSql('ALTER TABLE skuvalues DROP FOREIGN KEY FK_9793459AEBDCCF9B');
        $this->addSql('DROP INDEX IDX_9793459AC964ABE2 ON skuvalues');
        $this->addSql('DROP INDEX IDX_9793459AEBDCCF9B ON skuvalues');
        $this->addSql('ALTER TABLE skuvalues ADD production_option_id INT DEFAULT NULL, ADD production_option_value_id INT DEFAULT NULL, DROP product_option_id, DROP product_option_value_id');
        $this->addSql('ALTER TABLE skuvalues ADD CONSTRAINT FK_9793459A5695A923 FOREIGN KEY (production_option_value_id) REFERENCES product_option_value (id)');
        $this->addSql('ALTER TABLE skuvalues ADD CONSTRAINT FK_9793459A5B4CB5 FOREIGN KEY (production_option_id) REFERENCES product_option (id)');
        $this->addSql('CREATE INDEX IDX_9793459A5B4CB5 ON skuvalues (production_option_id)');
        $this->addSql('CREATE INDEX IDX_9793459A5695A923 ON skuvalues (production_option_value_id)');
    }
}
